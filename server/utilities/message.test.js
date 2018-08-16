const expect = require("expect");

const { generateMessage } = require("./message");
const { generateLocationMessage } = require("./geolocation");

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

describe("generateLocationMessage", () => {
  it("should generate the correct location", () => {
    // store res in variable
    let from = "Donda";
    let latitude = 1;
    let longitude = 1;
    let url = "https://www.google.com/maps?q=1,1";
    let message = generateLocationMessage(from, latitude, longitude);

    // assert createdAt is number
    expect(message.createdAt).toBeA("number");
    // assert from match
    // assert url match
    expect(message).toInclude({
      from,
      url
    });
  });
});
