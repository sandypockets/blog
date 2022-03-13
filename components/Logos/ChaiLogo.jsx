import { svgFill } from "./svgFill";
import { svgClasses } from "./svgClasses";

export default function ChaiLogo() {
  return (
    <div className={svgClasses}>
      <svg
        fill={svgFill}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Chai</title>
        <path d="M22.2235 5.8311 12.2307.0619a.4617.4617 0 0 0-.4615 0L1.7765 5.8311a.4615.4615 0 0 0-.2308.3997v11.5385c0 .1649.088.3173.2308.3997l9.9928 5.7692a.4617.4617 0 0 0 .4615 0l9.9928-5.7692a.4615.4615 0 0 0 .2308-.3997V6.2308a.4618.4618 0 0 0-.2309-.3997zm-.6304 11.7074L12 23.0769l-9.5931-5.5385V6.4615L12 .9231l9.5931 5.5385v11.0769zM11.2957 8.1858c.3873-.2769.7918-.4965 1.2137-.6588s.8427-.2434 1.2624-.2434c.2596 0 .5019.0379.7269.1136.225.0757.4197.185.5841.3278s.2942.3202.3894.5322c.0952.212.1428.4543.1428.7269 0 .3288-.0649.6555-.1947.98-.1298.3245-.304.6252-.5225.9022s-.4706.5192-.7561.7269-.582.357-.8892.4478l-.1363-.2272a2.0872 2.0872 0 0 0 .4998-.3505 2.2747 2.2747 0 0 0 .3894-.4835c.1082-.1796.1915-.37.2499-.5712a2.1893 2.1893 0 0 0 .0876-.6133c0-.238-.0346-.463-.1038-.675-.0692-.212-.1709-.397-.305-.5549-.1341-.1579-.2996-.2823-.4965-.3732-.1969-.0909-.423-.1363-.6782-.1363-.3115 0-.5971.0606-.8567.1817-.2596.1212-.4933.2845-.701.49s-.3883.4413-.5419.7075a4.874 4.874 0 0 0-.3829.8373 5.6168 5.6168 0 0 0-.2304.8859c-.0519.2986-.0779.5798-.0779.8438 0 .2683.0281.5452.0844.8308s.1385.5668.2466.8438c.1082.2769.2423.5387.4024.7853.1601.2466.3451.463.5549.649a2.583 2.583 0 0 0 .701.4446c.2575.1103.5376.1655.8405.1655.2077 0 .41-.0281.6069-.0844a2.9874 2.9874 0 0 0 .5679-.2272 3.2094 3.2094 0 0 0 .516-.3375 3.9668 3.9668 0 0 0 .4511-.4219l.2142.2077c-.1904.251-.4165.4922-.6782.7237a5.5434 5.5434 0 0 1-.847.6166 4.6241 4.6241 0 0 1-.9508.4284c-.331.106-.6588.159-.9833.159-.3159 0-.6133-.0552-.8924-.1655-.2791-.1103-.5355-.2596-.7691-.4478s-.4424-.4089-.6263-.662c-.1839-.2531-.3397-.5225-.4673-.8081s-.225-.5798-.2921-.8827-.101-.5992-.101-.8891c0-.4197.0703-.8513.2109-1.2948s.3343-.874.5809-1.2916.5376-.8124.873-1.1845c.3353-.3721.6966-.6967 1.0839-.9736z" />
      </svg>
    </div>
  );
}
