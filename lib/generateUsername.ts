const adjectives = ["Cosmic", "Neon", "Silent", "Swift"];
const nouns = ["Falcon", "Tiger", "Phoenix", "Nebula"];

export function generateUsername(
  screenResolution: string,
  colorDepth: string,
): string {
  const input = `${screenResolution}\0${colorDepth}`;
  let hash = 0x811c9dc5;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  const unsignedHash = hash >>> 0;
  const adjective = adjectives[unsignedHash % adjectives.length];
  const noun = nouns[(unsignedHash >>> 8) % nouns.length];
  const number = String((unsignedHash >>> 16) % 100).padStart(2, "0");

  return `${adjective}${noun}${number}`;
}
