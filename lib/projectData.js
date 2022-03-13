import StackLink from "../components/StackLink";

export const projectData = [
  {
    title: "Shorter",
    blurb:
      "A full stack link shortener, similar to Bitly, with magic link email authentication.",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://nextjs.org/" children="Next.js" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
      <StackLink href="https://supabase.com/" children="Supabase" />,
      <StackLink href="https://nextjs.org/" children="Storybook" />,
    ],
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    p1: "Shorter is something I built over a weekend, just for fun. I'd made a link shortener in the past, with Express.js and EJS templates (and without a database), but wanted to give it another go after getting my bearings with React.js. At the time, I had also just become familiar with Next.js, and decided to use it with Shorter too, taking advantage of features like dynamic routing and API routes.",
    p2: "Shorter's React frontend is styled with Tailwind CSS, and the backend (and authentication) uses a PostgreSQL database from Supabase.",
    p3: "Since this project was fairly straightforward, basic CRUD operations with technologies I was mostly familiar with, it didn't present any significant challenges. My biggest takeaway from this project would be the tech stack. It was such a joy to work with. As you might have noticed, the vast majority of my projects built after this one use the same stack.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Next.js Blog Starter",
    blurb:
      "A custom Next.js blog starter for use with create-next-app. This starter is based on the original blog starter provided by Next, but includes a few extra features and performance improvements that are nice to have right out of the box.",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://nextjs.org/" children="Next.js" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
      <StackLink
        href="https://analytics.google.com"
        children="Google Analytics"
      />,
      <StackLink href="https://sendgrid.com/" children="SendGrid" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Ethereum Tip Jar",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink href="https://github.com/ChainSafe/web3.js" children="Web3" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Chrome Extension Template",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink
        href="https://developer.chrome.com/docs/extensions/mv3/getstarted/"
        children="Chrome Extension"
      />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Fast Tabs",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink
        href="https://developer.chrome.com/docs/extensions/mv3/getstarted/"
        children="Chrome Extension"
      />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Ticketer",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink
        href="https://developer.chrome.com/docs/extensions/mv3/getstarted/"
        children="Chrome Extension"
      />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "User Authentication with Ethereum",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink href="https://github.com/ChainSafe/web3.js" children="Web3" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Extra",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://rubyonrails.org/" children="Ruby on Rails" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Tattle",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactjs.org/" children="React.js" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
      <StackLink href="https://supabase.com/" children="Supabase" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
  {
    imageSrc: "/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpeg",
    title: "Tattle Native",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    href: "https://github.com/sandypockets/blog",
    stack: [
      <StackLink href="https://reactnative.dev/" children="React Native" />,
      <StackLink href="https://tailwindcss.com/" children="Tailwind CSS" />,
      <StackLink href="https://supabase.com/" children="Supabase" />,
    ],
    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
    p3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus mattis molestie. Arcu felis bibendum ut tristique et egestas quis ipsum. Mauris vitae ultricies leo integer. Commodo elit at imperdiet dui. Aliquet eget sit amet tellus cras. Auctor neque vitae tempus quam pellentesque nec.",
  },
];
