import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/onedrive';
import sanitize from 'sanitize-filename';

export async function PUT(request: NextRequest) {
  // Parse the form data from the request.
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  // Ensure a file field is provided.
  const fileField = formData.get('file');
  if (!fileField || !(fileField instanceof File)) {
    return NextResponse.json({ error: 'No file part' }, { status: 400 });
  }

  // Get file name and read the file data as a Buffer.
  const fileName = fileField.name;
  const binaryData = Buffer.from(await fileField.arrayBuffer());

  // Determine the OneDrive path based on file mimetype.
  let onedrivePath = fileField.type?.startsWith('image/') ? 'image/' : 'files/';

  // Append extra path provided in the form data (if any).
  const extraPath = formData.get('path');
  if (extraPath && typeof extraPath === 'string') {
    onedrivePath += extraPath;
  }

  // Remove starting and trailing slashes.
  if (onedrivePath.startsWith('/')) {
    onedrivePath = onedrivePath.substring(1);
  }
  if (onedrivePath.endsWith('/')) {
    onedrivePath = onedrivePath.substring(0, onedrivePath.length - 1);
  }

  // Sanitize the file name by removing "/" characters.
  const sanitizedFileName = sanitize(fileName)

  try {
    // Call your uploadFile function.
    const uploadedUrl = await uploadFile(binaryData, onedrivePath, sanitizedFileName);
    if (uploadedUrl) {
      return NextResponse.json({ url: uploadedUrl }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}