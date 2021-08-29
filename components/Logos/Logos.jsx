import ReactLogo from "./ReactLogo";
import JsLogo from "./JsLogo"
import RubyLogo from "./RubyLogo"
import RailsLogo from "./RailsLogo";
import HtmlLogo from "./HtmlLogo";
import CssLogo from "./CssLogo";
import NodeLogo from "./NodeLogo";
import PostgresqlLogo from "./PostgresqlLogo";
import SqlLiteLogo from "./SqlLiteLogo";
import MarkdownLogo from "./MarkdownLogo";
import ExpressLogo from "./ExpressLogo";
import BootstrapLogo from "./BootstrapLogo";
import ChaiLogo from "./ChaiLogo";
import CypressLogo from "./CypressLogo";
import JestLogo from "./JestLogo";
import JQueryLogo from "./JQueryLogo";
import NextJsLogo from "./NextJsLogo";
import MochaLogo from "./MochaLogo";
import SassLogo from "./SassLogo";
import StorybookLogo from "./StorybookLogo";
import TailwindLogo from "./TailwindLogo";
import D3Logo from "./D3Logo";
import JamstackLogo from "./JamstackLogo";
import GitLogo from "./GitLogo";
import SeleniumLogo from "./SeleniumLogo";
import TestingLibrary from "./TestingLibrary";

export default function Logos() {
  return (
    <div className="flex justify-center flex-wrap  mini:pb-0 lg:mx-18 xl:mx-24 2xl:mx-60">

      <NodeLogo />
      <ReactLogo />
      <ExpressLogo />
      <RubyLogo />
      <RailsLogo />

      <HtmlLogo />
      <JsLogo />
      <CssLogo />
      <SassLogo />
      <TailwindLogo />
      <BootstrapLogo />

      <MarkdownLogo />

      <GitLogo />
      <JQueryLogo />
      <D3Logo />
      <NextJsLogo />
      <JamstackLogo />

      <PostgresqlLogo />
      <SqlLiteLogo />

      <StorybookLogo />
      <JestLogo />
      <TestingLibrary />
      <MochaLogo />
      <ChaiLogo />
      <CypressLogo />
      <SeleniumLogo />

    </div>
  )
}