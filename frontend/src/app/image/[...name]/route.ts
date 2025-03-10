import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { downloadFile } from '@/lib/onedrive';

export async function GET(request: Request, { params }: { params: { name: string[] } }) {
  // Log the request path
  const filePath = "/image/" + params.name.join('/');
  console.log(filePath);

  // Retrieve query parameters
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const widthParam = searchParams.get('width');
  const heightParam = searchParams.get('height');
  const outTypeParam = searchParams.get('format');

  const width = widthParam ? parseInt(widthParam) : undefined;
  const height = heightParam ? parseInt(heightParam) : undefined;

  // Download the file using the request path (or modify as needed)
  let fileData: Buffer;
  try {
    fileData = await downloadFile(filePath);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error downloading file' },
      { status: 500 }
    );
  }

  // Attempt to process the image using sharp.
  let image = sharp(fileData);
  let metadata;
  try {
    metadata = await image.metadata();
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error processing image' },
      { status: 500 }
    );
  }

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  // If resizing parameters are provided, determine new dimensions.
  if (width || height) {
    let newWidth: number;
    let newHeight: number;

    if (width && height) {
      newWidth = width;
      newHeight = height;
    } else if (width && originalWidth && originalHeight) {
      newWidth = width;
      newHeight = Math.round((width / originalWidth) * originalHeight);
    } else if (height && originalWidth && originalHeight) {
      newHeight = height;
      newWidth = Math.round((height / originalHeight) * originalWidth);
    } else {
      // If metadata is missing, fall back to original dimensions.
      newWidth = originalWidth || width || 0;
      newHeight = originalHeight || height || 0;
    }
    image = image.resize(newWidth, newHeight);
  }

  // Determine output format and MIME type.
  let outFormat: string;
  if (outTypeParam) {
    outFormat = outTypeParam.toUpperCase();
    if (outFormat === 'JPG') {
      outFormat = 'JPEG';
    }
  } else {
    // If not specified, use the image's original format or default to PNG.
    outFormat = metadata.format ? metadata.format.toUpperCase() : 'PNG';
    if (outFormat === 'JPG') {
      outFormat = 'JPEG';
    }
  }

  let mimeType: string;
  let imageBuffer: Buffer;
  // Convert the image to the desired output format.
  if (outFormat === 'JPEG') {
    imageBuffer = await image.jpeg().toBuffer();
    mimeType = 'image/jpeg';
  } else if (outFormat === 'PNG') {
    imageBuffer = await image.png().toBuffer();
    mimeType = 'image/png';
  } else if (outFormat === 'WEBP') {
    imageBuffer = await image.webp().toBuffer();
    mimeType = 'image/webp';
  } else if (outFormat === 'TIFF') {
    imageBuffer = await image.tiff().toBuffer();
    mimeType = 'image/tiff';
  } else {
    // Fallback: output the image in its current format.
    imageBuffer = await image.toBuffer();
    mimeType = `image/${outFormat.toLowerCase()}`;
  }

  // Create the response with the image buffer and set caching headers (cache for 1 hour)
  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
