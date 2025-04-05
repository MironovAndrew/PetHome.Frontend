import axios from "axios";
import { eTag } from "../../shared/models/DataRequests/File/eTag";
 
const FILES_URL: string = "http://localhost:5053/";

export class FilesService {
  static async StartMultipartUpload(
    bucketName: string,
    fileName: string,
    contentType: string,
    size: number
  ) {
    const method = "files/multipart/presigned";
    const response = await axios.post<{ key: string; uploadId: string }>(
      FILES_URL + method,
      {
        bucketName,
        fileName,
        contentType,
        size,
      }
    );

    return response;
  }

  //To s3
  static async UploadPart(url: string, chunk: Blob) {
    const response = await axios.put(url, chunk, {
      headers: { "Content-Type": chunk.type },
    });

    return response;
  }

  static async GetPresignedUrl(
    bucketName: string,
    key: string,
    uploadId: string,
    partNumber: number
  ) {
    const method = `files/${key}/part-presigned`;
    console.log(`axios: ${method}`);

    const response = await axios.post<{ key: string; url: string }>(
      FILES_URL + method,
      {
        bucketName,
        uploadId,
        partNumber,
      }
    );
    console.log(`response GetPresignedUrl: ${response.data}`);

    return response;
  }

  static async CompleteMultipart(
    bucketName: string,
    key: string,
    uploadId: string,
    parts: eTag[]
  ) {
    const method = `files/${key}/complite-multipart/presigned`;
    console.log(`axios: ${method}`);

    const response = await axios.post<{ key: string; location: string }>(
      FILES_URL + method,
      {
        bucketName,
        uploadId,
        parts,
      }
    );
    console.log(`response CompleteMultipart: ${response.data}`);

    return response;
  }
}
