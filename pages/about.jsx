import Head from "next/head";
import Container from "../components/Layout/Container";
import Layout from "../components/Layout/Layout";
import { BLOG_NAME } from "../lib/constants";
import PageHeading from "../components/PageHeading";
import Logos from "../components/Logos/Logos";
import Highlight from "../components/Utils/Highlight";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About | {BLOG_NAME}</title>
      </Head>
      <Container>
        <div className="pt-24 mb-12 h-full sm:pt-24 sm:my-11 sm:mx-22 md:mx-8 lg:mx-14 xl:mx-32 2xl:max-w-7xl">
          <div
            className={
              " text-3xl pl-6 sm:text-6xl sm:leading-none sm:pl-3 sm:mb-20 md:text-7xl md:pl-5 lg:pl-16 xl:text-8xl 2xl:text-9xl xl:pl-14 2xl:pl-16 font-bold"
            }
          >
            <p>
              I&apos;m a serial learner, <br />
              helping to build a <Highlight>safe</Highlight>,{" "}
              <Highlight>open</Highlight>, and <Highlight>inclusive</Highlight>{" "}
              internet.
            </p>
          </div>
          <h2 className="flex justify-center font-mono tracking-tight mt-12 lg:mt-24 mb-4 text-2xl text-gray-400">
            My Tech Stack
          </h2>
          <div>
            <Logos />
          </div>
        </div>

        {/*<PageHeading>*/}
        {/*  Nice to meet you.*/}
        {/*</PageHeading>*/}
        {/*<section className="max-w-3xl mx-auto py-8 md:py-16 lg:py-24">*/}
        {/*  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
        {/*  <br/>*/}
        {/*  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
        {/*</section>*/}
      </Container>
    </Layout>
  );
}
