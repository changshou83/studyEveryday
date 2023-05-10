import { getPageContent, onLinkNavigate, transitionHelper } from "./utils.js";

document.body.innerHTML = `
<header class="main-header">
  <span class="main-header-text">Demo site</span>
</header>
<main class="content">
  <h1 class="content-title">Page 1</h1>
  <p>This is the content for page 1.</p>
  <p>Why not check out <a href="./page-2.html">page 2</a>?</p>
</main>
`;

let lastClick;
addEventListener("click", (event) => (lastClick = event));

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);

  const x = lastClick?.clientX ?? innerWidth / 2;
  const y = lastClick?.clientY ?? innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  const transition = transitionHelper({
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
    },
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      [
        { clipPath: `circle(0 at ${x}px ${y}px)` },
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
      ],
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
});
