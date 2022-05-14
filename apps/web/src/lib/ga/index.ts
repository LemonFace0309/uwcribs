// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {
    page_path: url,
  });
};

type EventAction = Gtag.EventNames | string;
type EventParams = Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
type EventProps = {
  action: EventAction;
  params: EventParams;
};

// log specific events happening.
/**
 * @example
 * event({
      action: "search",
      params : {
        search_term: query
      }
    })
 */
export const event = ({ action, params }: EventProps) => {
  window.gtag("event", action, params);
};
