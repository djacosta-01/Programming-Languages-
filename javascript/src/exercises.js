import fetch from "node-fetch";
import { createCipheriv, createDecipheriv } from "crypto";

export function change(amount) {
  if (amount < 0) {
    throw new RangeError("amount cannot be negative");
  }
  let [coins, remaining] = [[], amount];
  for (let denomination of [25, 10, 5]) {
    coins.push(Math.floor(remaining / denomination));
    remaining %= denomination;
  }
  coins.push(remaining);
  return coins;
}

export function stretched(string) {
  let trimmedWord = string.replace(/\s/g, "");
  let characters = [...trimmedWord];
  let stretchedWord = characters.map(function (element, index) {
    return element.repeat(index + 1);
  });
  return stretchedWord.join("");
}

export function say(input) {
  if (input === undefined) {
    return "";
  } else {
    return (nextInput) => {
      if (nextInput === undefined) {
        return input;
      } else {
        return say(input + " " + nextInput);
      }
    };
  }
}

export function powers(base, limit, callback) {
  let product = 1;
  while (product <= limit) {
    callback(product);
    product *= base;
  }
}

export function* powersGenerator(base, limit) {
  let value = 1;
  while (value <= limit) {
    yield value;
    value *= base;
  }
}

export function makeCryptoFunctions({ forKey, using, withIV }) {
  let encriptor = (word) => {
    let cipher = createCipheriv(using, forKey, withIV);
    let encrypted = cipher.update(word, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  };
  let decriptor = (word) => {
    let decipher = createDecipheriv(using, forKey, withIV);
    let decrypted = decipher.update(word, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };
  let res = [encriptor, decriptor];
  return res;
}

export function topTenScorers(players) {
  return Object.entries(players)
    .flatMap((teamName) =>
      teamName[1].map((playerArray) => [...playerArray, teamName[0]])
    )
    .filter((val) => val[1] >= 15)
    .map((players) => {
      return {
        name: players[0],
        ppg: players[2] / players[1],
        team: players[3],
      };
    })
    .sort((player1, player2) => player2.ppg - player1.ppg)
    .slice(0, 10);
}

export async function pokemonInfo(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const pokeInfo = await response.json();
  return {
    id: pokeInfo.id,
    name: pokeInfo.forms[0].name,
    weight: pokeInfo.weight,
  };
}

export class Quaternion {
  #a;
  #b;
  #c;
  #d;
  constructor(a, b, c, d) {
    this.#a = a;
    this.#b = b;
    this.#c = c;
    this.#d = d;
  }

  coefficients() {
    return [this.#a, this.#b, this.#c, this.#d];
  }

  plus(q2) {
    return new Quaternion(
      this.#a + q2.#a,
      this.#b + q2.#b,
      this.#c + q2.#c,
      this.#d + q2.#d
    );
  }
  times(q2) {
    let curA =
      this.#a * q2.#a - this.#b * q2.#b - this.#c * q2.#c - this.#d * q2.#d;
    let curB =
      this.#b * q2.#a + this.#a * q2.#b + this.#c * q2.#d - this.#d * q2.#c;
    let curC =
      this.#a * q2.#c - this.#b * q2.#d + this.#c * q2.#a + this.#d * q2.#b;
    let curD =
      this.#a * q2.#d + this.#b * q2.#c - this.#c * q2.#b + this.#d * q2.#a;
    return new Quaternion(curA, curB, curC, curD);
  }
}
