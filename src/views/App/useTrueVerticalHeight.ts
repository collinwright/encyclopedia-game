import * as React from "react";

/* Hook to define a CSS variable representing a "true" vertical height unit.
 *
 * Many mobile browsers define the viewport as the full size of the screen,
 * ignoring the space used by the address bar and any menu bars. This is
 * intentional to avoid "jumpiness" when these address bars or menu bars
 * hide themselves. For most websites, it is a negligible effect, but it
 * can be annoying for sites that try to use the "full" screen (such as this
 * one). Read more here: https://bugs.webkit.org/show_bug.cgi?id=141832
 *
 * I was unable to find a pure CSS fix. This hook creates a ref that you can
 * apply to an element; when applied, a CSS variable will be defined with a
 * value equal to 1/100 of the true viewport size. This variable can be used
 * in place of "vh" units to achieve the proper effect on both mobile and
 * desktop.
 *
 * The ref also handles window resize events.
 */
export default function useTrueVerticalHeight<T extends HTMLElement>(
  propertyName: string,
  dependencies: any[] | undefined = undefined
): React.RefObject<T> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const resize = () => {
      if (ref.current != null) {
        ref.current.style.setProperty(
          propertyName,
          `${window.innerHeight / 100}px`
        );
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, dependencies);

  return ref;
}
