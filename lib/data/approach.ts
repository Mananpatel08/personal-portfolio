export type Step = {
  id: string;
  title: string;
  body: string;
};

/** Four steps, in the order I actually work in. Not a methodology. */
export const approach: Step[] = [
  {
    id: "01",
    title: "Understand the domain",
    body: "Before any code, I want to know how the business actually runs — including the awkward cases everyone has quietly worked around. Most bad architecture starts as a misunderstanding that got typed up.",
  },
  {
    id: "02",
    title: "Model the data",
    body: "The schema is the real design document. I spend disproportionate time here, because every shortcut taken in the model gets paid back with interest once there are views depending on it.",
  },
  {
    id: "03",
    title: "Ship a thin slice",
    body: "One feature all the way through — migration, serializer, permission, endpoint, interface. Working end to end early is how you find the wrong assumption while it’s still cheap to change.",
  },
  {
    id: "04",
    title: "Harden it",
    body: "Permissions, failure modes, deployment. Docker images, an Nginx reverse proxy, and the unglamorous question of what happens when the third-party webhook arrives twice.",
  },
];
