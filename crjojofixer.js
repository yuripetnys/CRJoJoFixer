stand_dic = [
    [/Golden Wind/g, "Gold Experience"],
    [/Golden\\NWind/g, "Gold\\NExperience"],
    [/Zipper Man/g, "Sticky Fingers"],
    [/Zipperman/g, "Sticky Fingers"],
    [/Zipper\\NMan/g, "Sticky\\NFingers"],
    [/Moody Jazz/g, "Moody Blues"],
    [/Moody\\NJazz/g, "Moody\\NBlues"],
    [/Six Bullets/g, "Sex Pistols"],
    [/Six\\NBullets/g, "Sex\\NPistols"],
    [/Bullets/g, "Pistols"],
    [/Li'l Bomber/g, "Aerosmith"],
    [/Li'l\\NBomber/g, "Aerosmith\\N"],
    [/Purple Smoke/g, "Purple Haze"],
    [/Purple\\NSmoke/g, "Purple\\NHaze"],
    [/Spicy Lady/g, "Spice Girl"],
    [/Spicy\\NLady/g, "Spice\\NGirl"],
    [/Reverb/g, "Echoes"],
    [/Shadow Sabbath/g, "Black Sabbath"],
    [/Shadow\\NSabbath/g, "Black\\NSabbath"],
    [/Tender Machine/g, "Soft Machine"],
    [/Tender\\NMachine/g, "Soft\\NMachine"],
    [/Arts & Crafts/g, "Kraft Work"],
    [/Arts\\N& Crafts/g, "Kraft\\NWork"],
    [/Arts &\\NCrafts/g, "Kraft\\NWork"],
    [/Arts\\N&\\NCrafts/g, "Kraft\\NWork"],
    [/Little Feet/g, "Tiny Feet"],
    [/Little\\NFeet/g, "Tiny\\NFeet"],
    [/Mirror Man/g, "Man in the Mirror"],
    [/Mirror\\NMan/g, "Man in\\Nthe Mirror"],
    [/Coco Large/g, "Coco Jumbo"],
    [/Coco\\NLarge/g, "Coco\\NJumbo"],
    [/Thankful Death/g, "Grateful Dead"],
    [/Thankful\\NDeath/g, "Grateful\\NDead"],
    [/Fisher Man/g, "Beach Boy"],
    [/Fisher\\NMan/g, "Beach\\NBoy"],
    [/Baby Head/g, "Baby Face"],
    [/Babyhead/g, "Baby Face"],
    [/White Ice/g, "White Album"],
    [/White\\NIce/g, "White\\NAlbum"],
    [/Crush/g, "Clash"],
    [/Talking Mouth/g, "Talking Head"],
    [/Talking\\NMouth/g, "Talking\\NHead"],
    [/Notorious Chase/g, "Notorious B.I.G."],
    [/Notorious\\NChase/g, "Notorious\\NB.I.G."],
    [/Metallic/g, "Metallica"],
    [/Green Tea/g, "Green Day"],
    [/Green\\NTea/g, "Green\\NDay"],
    [/Emperor Crimson/g, "King Crimson"],
    [/Emperor\\NCrimson/g, "King\\NCrimson"],
];

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    for (var i of stand_dic) {
        str = str.replace(i[0], i[1]);
    }
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["*://*.akamaized.net/*.txt*"], types: ["xmlhttprequest"]},
  ["blocking"]
);