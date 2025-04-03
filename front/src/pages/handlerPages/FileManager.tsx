import { Button, Input } from "@mui/material";
import { FilesService } from "../../api/services/fileService";
import { eTag } from "../../models/DataRequests/File/eTag";

export function FileManager() {
  const handleFileChange = async (file: File) => {
    const bucketNameInput = document.getElementById(
      bucketNameField
    ) as HTMLInputElement;
    const bucketName = bucketNameInput.value;

    console.log(`Start`);

    const startMultipartResponse = await FilesService.StartMultipartUpload(
      bucketName,
      file.name,
      file.type,
      file.size
    );

    console.log(`StartMultipartResponse: ${startMultipartResponse!.data.key}`);

    const chunkSize = 100 * 1024 * 1024;
    const parts: eTag[] = [];

    let partNumber = 1;
    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);

      const presignedUrl = await FilesService.GetPresignedUrl(
        bucketName,
        startMultipartResponse!.data.key,
        startMultipartResponse!.data.uploadId,
        partNumber
      );

      console.log(`PresignedUrl: ${presignedUrl!.data}`);

      const uploadPartResponse = await FilesService.UploadPart(
        presignedUrl!.data.url,
        chunk
      );
      console.log(`UploadPartResponse: ${uploadPartResponse!.data}`);

      const etag = uploadPartResponse?.headers["etag"] as string;
      parts.push({ partNumber, eTag: etag });
      partNumber++;
    }

    const completeMultipartResponse = await FilesService.CompleteMultipart(
      bucketName,
      startMultipartResponse!.data.key,
      startMultipartResponse!.data.uploadId,
      parts
    );

    console.log(
      `CompleteMultipartResponse: ${completeMultipartResponse!.data}`
    );
  };

  const bucketNameField: string = "bucketName";

  return (
    <div className="pt-10 flex flex-col items-center justify-center gap-9 w-full ">
      <Input
        id={bucketNameField}
        type="text"
        name="quantity"
        placeholder="Введите название Bucket'a"
      />
      <Button component="label" variant="contained">
        Загрузить видео
        <input
          type="file"
          className="hidden"
          accept="video/*"
          multiple={false}
          onChange={(e) => handleFileChange(e.target.files![0])}
        />
      </Button>
    </div>
  );
}
