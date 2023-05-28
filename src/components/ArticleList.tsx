import type { Component } from "solid-js";

import {
  createSignal,
  onMount,
  onCleanup,

  For
} from "solid-js";


const BlogList: Component<{
  articles: {
    title: string;
    url: string;
  }[]
}> = (props) => {
  const [selected, setSelected] = createSignal(0);

  const directionalKeysHandler = (ev: KeyboardEvent) => {
    ev.preventDefault();

    switch (ev.key) {
      case "ArrowUp": {
        if (selected() === 0) {
          // When we're all up, go back to bottom.
          setSelected(props.articles.length - 1);
          break;
        }

        setSelected(prev => --prev);
        
        break;
      }

      case "ArrowDown": {
        if (selected() === props.articles.length - 1) {
          // When we're all down, go back to top.
          setSelected(0);
          break;
        }

        setSelected(prev => ++prev);
        
        break;
      }

      case "Enter": {
        window.location.replace(props.articles[selected()].url);
        break;
      }
    }
  };

  onMount(() => window.addEventListener("keyup", directionalKeysHandler));
  onCleanup(() => window.removeEventListener("keyup", directionalKeysHandler));

  return (
    <For each={props.articles}>
      {(post, index) => (
        <a
          href={post.url}
          class="mx-4"
        >
          <div class="py-2"
            classList={{
              "bg-gray-300 px-4 text-gray-800": selected() === index()
            }}
            
            onMouseEnter={() => setSelected(index())}
          >
            <h2 class="block font-medium text-lg">+ {post.title}</h2>
            <p class="block opacity-80">This is some desc</p>
          </div>
        </a>
      )}
    </For>
  )
};

export default BlogList;