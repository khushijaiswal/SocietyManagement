import{r as n,j as t,J as g,K as f}from"./index-BNH9iTYT.js";import{B as y}from"./Button-NFEb7akR.js";import"./useId-cXK4N2WA.js";import"./ButtonBase-Djntgs0r.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,s,r)=>r?r.toUpperCase():s.toLowerCase()),l=e=>{const a=b(e);return a.charAt(0).toUpperCase()+a.slice(1)},m=(...e)=>e.filter((a,s,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===s).join(" ").trim(),j=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n.forwardRef(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:o="",children:i,iconNode:p,...c},u)=>n.createElement("svg",{ref:u,...v,width:a,height:a,stroke:e,strokeWidth:r?Number(s)*24/Number(a):s,className:m("lucide",o),...!i&&!j(c)&&{"aria-hidden":"true"},...c},[...p.map(([h,x])=>n.createElement(h,x)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(e,a)=>{const s=n.forwardRef(({className:r,...o},i)=>n.createElement(w,{ref:i,iconNode:a,className:m(`lucide-${C(l(e))}`,`lucide-${e}`,r),...o}));return s.displayName=l(e),s};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],k=d("circle-check",N);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],P=d("circle-x",A),B=[{name:"Free",price:"₹0",description:"For small societies or trials",features:["Up to 25 residents","Basic complaint management","Notices & announcements","Manual maintenance tracking","Basic facility booking","Guard check-in (manual)","Mobile + Web access"],unavailable:["Online payments","Real-time notifications","Analytics dashboard","Priority support"]},{name:"Pro",price:"₹999/mo",description:"For medium-sized societies",features:["Up to 100 residents","All Free Plan features","Online payments (Razorpay)","Real-time notifications","Basic analytics dashboard","Email support","Facility manager access","Visitor approvals","1GB cloud storage"],unavailable:["Advanced analytics","Polls & events","Custom domain"]},{name:"Pro Plus",price:"₹2499/mo",description:"For large gated communities",features:["Unlimited residents","All Pro Plan features","Advanced analytics & trends","Automated billing & reminders","Role-based admin panel","Polls & event management","Document storage","Custom domain","Priority support","10GB+ cloud storage"],unavailable:[]}];function U(){return t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 p-6",children:B.map(e=>t.jsx(g,{className:"rounded-2xl shadow-lg",children:t.jsxs(f,{className:"p-6 space-y-4",children:[t.jsx("h2",{className:"text-2xl font-bold text-center",children:e.name}),t.jsx("p",{className:"text-center text-xl font-semibold",children:e.price}),t.jsx("p",{className:"text-center text-muted-foreground",children:e.description}),t.jsxs("div",{className:"space-y-2",children:[e.features.map((a,s)=>t.jsxs("div",{className:"flex items-center gap-2 text-green-600",children:[t.jsx(k,{className:"w-5 h-5"}),t.jsx("span",{children:a})]},s)),e.unavailable.map((a,s)=>t.jsxs("div",{className:"flex items-center gap-2 text-gray-400 line-through",children:[t.jsx(P,{className:"w-5 h-5"}),t.jsx("span",{children:a})]},s))]}),t.jsx(y,{className:"w-full mt-4",children:"Get Started"})]})},e.name))})}export{U as default};
