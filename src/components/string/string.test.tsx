import { reverseString } from "./utils";

describe("Тестирование алгоритма разворота строки", () => {
  it("Корректно разворачивает строку c чётным количеством символов", async () => {
    expect(await reverseString("123456")).toEqual("654321");
  });

  it("Корректно разворачивает строку с нечетным количеством символов", async () => {
    expect(await reverseString("12345")).toEqual("54321");
  });

  it("Корректно разворачивает строку с одним символом", async () => {
    expect(await reverseString("1")).toEqual("1");
  });

  it("Корректно разворачивает пустую строку", async () => {
    expect(await reverseString("")).toEqual("");
  });
});
