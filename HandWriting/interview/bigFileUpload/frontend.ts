{
  /* <input type="file" id="input"></input>
<button id="upload">上传</buttonsh>
<div id="progress"></div> */
}
let chunkList: Array<{ file: File }> = [];
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
document.querySelector("#input")?.addEventListener("change", (evt) => {
  const target = evt.target as HTMLInputElement;
  if (target.files) {
    chunkList = createChunk(target.files[0]);
  }
});

class Chunk {
  file: File;
  size: number;
  percent: number;
  fileName: string;
  chunkName: string;
  index: number;
  constructor(file: File, index: number) {
    this.file = file;
    this.size = file.size;
    this.percent = 0;
    this.fileName = file.name;
    this.chunkName = `${file.name}-${index}`;
    this.index = index;
  }
}
document.querySelector("#upload")?.addEventListener("click", (evt) => {
  uploadFile(chunkList.map(({ file }, index) => new Chunk(file, index)));
});

/**
 * 创建文件切片
 * @param {File} file
 * @param {number} size
 * @returns
 */
function createChunk(file: File, size: number = 2 * 1024 * 1024) {
  const chunks: Array<{ file: File }> = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({
      file: file.slice(cur, cur + size) as File,
    });
    cur += size;
  }
  return chunks;
}

/**
 * 上传文件分片
 * @param {Chunk[]} fileList
 */
async function uploadFile(fileList: Chunk[]) {
  const list = fileList
    .map(({ file, fileName, index, chunkName }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("chunkName", chunkName);
      return {
        formData,
        index,
      };
    })
    .map(({ formData, index }) =>
      request({
        method: "POST",
        url: "",
        data: formData,
      }).then((res) => {
        let p = document.createElement("p");
        p.innerHTML = `${fileList[index].chunkName}--${res.data.message}`;
        document.querySelector("#progress")?.appendChild(p);
      })
    );
  await Promise.all(list);
}

type RequestConfig = { method: "POST" | "GET"; url: string; data: any };
type Res = {
  data: {
    message: string;
  };
};
/**
 * fetch封装
 * @param {RequestConfig} param0
 * @returns
 */
async function request({ method, url, data }: RequestConfig): Promise<Res> {
  return fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
    method,
  }).then((res) => res.json());
}
