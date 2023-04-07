import { rest } from "msw";
import { API_URL } from "../app/constants";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    if (req.url.searchParams.get("character") === "Nelson") {
      return res(
        ctx.json([
          {
            quote:
              "Shoplifting is a victimless crime, like punching someone in the dark.",
            character: "Nelson Muntz",
            image:
              "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185",
            characterDirection: "Left",
          },
        ])
      );
    } else {
      return res(
        ctx.json([
          {
            quote: "Gah, stupid sexy Flanders!",
            character: "Homer Simpson",
            image:
              "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
            characterDirection: "Right",
          },
        ])
      );
    }
  }),
];
