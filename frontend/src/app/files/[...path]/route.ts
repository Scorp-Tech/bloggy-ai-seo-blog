import { NextRequest, NextResponse } from 'next/server';
import mime from 'mime-types';
import { downloadFile } from '@/lib/onedrive';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Reconstruct the file path from the dynamic segments.
  const filePath = "files/" + params.path.join('/');
  let fileData: Buffer;
  try {
    fileData = await downloadFile(filePath);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error downloading file' },
      { status: 500 }
    );
  }

  // Determine the MIME type from the file name.
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';

  return new NextResponse(fileData, {
    status: 200,
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
