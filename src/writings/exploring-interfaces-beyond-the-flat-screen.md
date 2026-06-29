I have around a thousand liked songs on Spotify, and I usually play from that list. But finding something I saved years ago is a hassle. There are tracks I remember by feeling or genre, but not by name — especially some Japanese or Russian songs I can't search for easily.

So I decided to integrate the interface with the Spotify API (you can see the experience on the video on left). The idea was simple: fly through my tracks, play them with a single click, and add them to a playlist with a double click.

One limitation I ran into was the data itself. Spotify mostly gives you things like artist name, release date, or when a track was added — which isn't always how you remember music.

So I used Gemini to generate the kind of categories I actually needed — things like mood, genre, or general feel. It made browsing much more natural, especially for tracks I couldn't search for by name.

And it worked.

---

I wish I could share it more widely, but Spotify's API is quite strict for side projects. It only allows a small number of authenticated users. If you're curious and want to try it, feel free to reach out and I can add you.
🔗[playlist-universe-for-spotify](https://playlist-universe.vercel.app/)

Because of that limitation, I looked for another way to showcase the idea.

I found a public API from the Art Institute of Chicago and used it to build a version that anyone can explore.
🔗[art-institute-chicago-pieces.vercel.app](https://art-institute-chicago-pieces.vercel.app/)

At that point, it started to feel reusable. So I turned it into a small package:
🔗[gallery-universe on npm](https://www.npmjs.com/package/gallery-universe)

I'd love to see more use cases for this kind of interaction — browsing catalogs, exploring products, even shopping. It opens up a different way of navigating content.

---

## The process

The process was mostly trial and error.

I started by building it with DOM elements and v-canvas, but it quickly became too heavy on the browser. Smooth interaction was the whole point of the experience, and it just wasn't there.

So I switched to canvas. That made things much smoother, especially when zooming and moving through the scene.

But then it started to feel a bit stiff. The interactions worked, but they didn't feel natural. The zooming was too direct — no easing, no transitions.

Adding those small details made a big difference. With some tweaking, the movement started to feel much closer to what I had in mind.

## What I learned
Working on this made a few things very clear.

**Interaction matters more than visuals.** The 3D effect is interesting, but without smooth movement and clear feedback, it quickly becomes frustrating.

**It's easy to make something that looks impressive, but much harder to make it feel usable.** Users still need a sense of direction — where they are, what they're looking at, and how to move.

**Performance turned out to be critical.** Even small delays or stutters break the experience. That's what pushed me away from DOM-based rendering and toward canvas.

**Turning it into a package was simpler than I expected** — once the core idea was clear, the rest followed naturally.

---

It started as curiosity.

It turned into something I can reuse and keep improving.
