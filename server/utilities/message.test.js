const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message", () => {
    // store res in variable
    let from = "Donda";
    let text = "Some message";
    let message = generateMessage(from, text);

    // assert createdAt is number
    expect(message.createdAt).toBeA("number");
    // assert from match
    // assert text match
    expect(message).toInclude({
      from: from,
      text: text
    });
  });
});
