import{_ as m}from"./ValaxyMain.vue_vue_type_style_index_0_lang.D9A7u8mY.js";import{f as k,a as y}from"./chunks/vue-router.B9o0VGxh.js";import{A as p,O as g,a2 as t,u as b,N as f,R as l,V as e,Y as a}from"./framework.BVtu4MtS.js";import"./app.DHGHswNL.js";import"./chunks/dayjs.i0BUjmvK.js";import"./chunks/vue-i18n.BgUPG-Ke.js";import"./chunks/pinia.CpydQbsa.js";import"./chunks/@vueuse/motion.D6DPsMOl.js";import"./chunks/nprogress.MTuYNGdb.js";import"./YunComment.vue_vue_type_style_index_0_lang.Dg9OBUaL.js";import"./index.C5okkQwF.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang.Qj2rLhdQ.js";import"./post._f2OBJOG.js";const v=k("/posts/smart-contract",async n=>JSON.parse('{"title":"憧憬成为 web3 高手之：智能合约","description":"","frontmatter":{"draft":true,"title":"憧憬成为 web3 高手之：智能合约","date":"2024-07-16","updated":"2024-07-16","categories":"Web3相关","tags":["web3","solidity"]},"headers":[{"level":2,"title":"智能合约的生命周期","slug":"智能合约的生命周期","link":"#智能合约的生命周期","children":[]},{"level":2,"title":"用 Solidity 构建智能合约","slug":"用-solidity-构建智能合约","link":"#用-solidity-构建智能合约","children":[]},{"level":2,"title":"使用 Solidity 编程","slug":"使用-solidity-编程","link":"#使用-solidity-编程","children":[{"level":3,"title":"数据类型","slug":"数据类型","link":"#数据类型","children":[]},{"level":3,"title":"预定义的全局变量和函数","slug":"预定义的全局变量和函数","link":"#预定义的全局变量和函数","children":[]}]}],"relativePath":"pages/posts/smart-contract.md","lastUpdated":1736873625000}'),{lazy:(n,o)=>n.name===o.name}),R={__name:"smart-contract",setup(n,{expose:o}){var d;const{data:r}=v(),u=y(),s=Object.assign(u.meta.frontmatter||{},((d=r.value)==null?void 0:d.frontmatter)||{});return u.meta.frontmatter=s,p("pageData",r.value),p("valaxy:frontmatter",s),globalThis.$frontmatter=s,o({frontmatter:{draft:!0,title:"憧憬成为 web3 高手之：智能合约",date:"2024-07-16",updated:"2024-07-16",categories:"Web3相关",tags:["web3","solidity"]}}),(i,h)=>{const c=m;return f(),g(c,{frontmatter:b(s)},{"main-content-md":t(()=>h[0]||(h[0]=[l("h1",{id:"智能合约",tabindex:"-1"},[e("智能合约 "),l("a",{class:"header-anchor",href:"#智能合约","aria-label":'Permalink to "智能合约"'},"​")],-1),l("p",null,"最初由密码学家 Nick Szabo 提出，web3 语境下指代在 Ethereum 虚拟机环境中运行的不可变的计算机程序。",-1),l("h2",{id:"智能合约的生命周期",tabindex:"-1"},[e("智能合约的生命周期 "),l("a",{class:"header-anchor",href:"#智能合约的生命周期","aria-label":'Permalink to "智能合约的生命周期"'},"​")],-1),l("p",null,"智能合约通常以高级语言编写，例如 Solidity，随后被编译为 EVM 中运行的低级字节码。编译完成后会随着合约创建交易被部署至区块链中。每个合约都由随机生成的以太坊地址标识，该地址在交易中作为接收者，可以将资金发送给合约或者调用合约的某个功能。",-1),l("p",null,[e("合约 "),l("strong",null,"只有"),e(" 在被交易调用时才会运行，以太坊的所有智能合约均由 EOA 发起的交易执行。合约可以调用另一个合约，但是这种执行链的第一个合约永远是由 EOA 发起的交易执行。合约永远不会自动执行或者在后台运行，在被交易触发执行，直接或间接作为执行链的一环之前，合约在区块链上实际上是“休眠”的。")],-1),l("p",null,[e("交易是 "),l("em",null,"原子性 atomic"),e(" 的，交易完全执行，只在交易成功中止时记录全局状态（合约，账户等）的任何更改。如果交易由于错误而失败，则所有的效果（状态变化）将会回滚，就好像交易从未执行一样。失败的交易仍然存储在区块链中，并从原始账户扣除 gas 成本，但对合约或者账户没有其他影响。")],-1),l("p",null,[e("合约的代码不能更改，然而合约可以被“删除”，从区块链上删除代码和它的内部状态（变量）。要删除合约，需要执行被称为 "),l("em",null,"SELFDESTRUCT"),e(" （曾被称为 "),l("em",null,"SUICIDE"),e(" ）的 EVM 操作码。 该操作码将区块链中的合约移除，该操作花费“负的 gas ”，从而激励储存状态的释放。该操作不会删除过去的交易记录，但是确实会从所有未来的区块中移除合约状态。")],-1),l("h2",{id:"用-solidity-构建智能合约",tabindex:"-1"},[e("用 Solidity 构建智能合约 "),l("a",{class:"header-anchor",href:"#用-solidity-构建智能合约","aria-label":'Permalink to "用 Solidity 构建智能合约"'},"​")],-1),l("p",null,"Solidity 由 GitHub 上的 Solidity 项目开发团队开发并维护：",-1),l("blockquote",null,[l("p",null,[l("a",{href:"https://github.com/ethereum/solidity",target:"_blank",rel:"noreferrer"},"https://github.com/ethereum/solidity")])],-1),l("p",null,[e("Solidity 项目的主要产品是 "),l("em",null,"Solidity Compiler（solc）"),e(" ，它将用 Solidity 语言编写的程序代码转换为 EVM 字节码，并生成其他制品，如应用程序二进制接口（ABI）等。")],-1),l("p",null,"Solidity 遵循语义化版本的版本模型，MAJOR.MINOR.PATCH，“major” 用于主要的和“不向前兼容”的更改递增，“minor” 在主要版本之间添加“向前兼容功能”时递增，“patch” 表示错误修复和安全相关的更改。",-1),l("h2",{id:"使用-solidity-编程",tabindex:"-1"},[e("使用 Solidity 编程 "),l("a",{class:"header-anchor",href:"#使用-solidity-编程","aria-label":'Permalink to "使用 Solidity 编程"'},"​")],-1),l("blockquote",null,[l("p",null,[l("a",{href:"https://solidity.readthedocs.io/en/latest/",target:"_blank",rel:"noreferrer"},"https://solidity.readthedocs.io/en/latest/")])],-1),l("h3",{id:"数据类型",tabindex:"-1"},[e("数据类型 "),l("a",{class:"header-anchor",href:"#数据类型","aria-label":'Permalink to "数据类型"'},"​")],-1),l("ul",null,[l("li",null,[l("em",null,"boolean（bool）"),e("：布尔值，"),l("code",null,"true"),e(" 或 "),l("code",null,"false"),e("，逻辑运算符 "),l("code",null,"!"),e("（not），"),l("code",null,"&&"),e("（and），"),l("code",null,"||"),e("（or），"),l("code",null,"=="),e("（equal），"),l("code",null,"!="),e("（not equal）")]),l("li",null,[l("em",null,"整数（int/uint）"),e("：有符号和无符号整数，从 "),l("code",null,"u/int8"),e(" 到 "),l("code",null,"u/int256"),e(" 以 8bits 递增，没有大小修饰后缀就表示 256bits")]),l("li",null,[l("em",null,"定点数（fixed/ufixed）"),e("：定义为 "),l("code",null,"u/fixedMxN"),e("，其中 "),l("em",null,"M"),e(" 是位大小（以8递增），_N_是小数点后的十进制树的个数")]),l("li",null,[l("em",null,"地址"),e("：20 字节的以太坊地址，address 对象有 balance（返回余额）和 transfer（转账）的成员方法")]),l("li",null,[l("em",null,"字节数组（定长）"),e("：固定大小的字节数组，定义为 "),l("em",null,"byte1"),e(" 到 "),l("em",null,"byte32")]),l("li",null,[l("em",null,"字节数组（动态）"),e("：动态大小的字节数组，定义为 "),l("em",null,"byte"),e(" 或 "),l("em",null,"string")]),l("li",null,[l("em",null,"enum"),e("：枚举离散值的用户自定义类型")]),l("li",null,[l("em",null,"struct"),e("：包含一组变量的用户自定义类型")]),l("li",null,[l("em",null,"mapping"),e("："),l("em",null,"key"),e(" => "),l("em",null,"value"),e(" 对的哈希查找表")])],-1),l("p",null,"Solidity 还提供了一系列用于计算不同单位的字面值：",-1),l("ul",null,[l("li",null,"时间单位：seconds，minutes，hours 和 days 可用作后缀，转换为基本单位 seconds 的倍数"),l("li",null,"以太的单位：wei，finney，szabo，和 ether 可用作后缀，转化位基本单位 wei 的倍数")],-1),l("div",{class:"language-solidity vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"solidity"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[l("code",{"v-pre":""},[l("span",{class:"line"},[l("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"require"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(withdraw_amount "),l("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"<="),l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 100000000000000000"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},");")])])]),l("button",{class:"collapse"})],-1),l("p",null,"使用单位倍数 ether 改进一下，便于阅读",-1),l("div",{class:"language-solidity vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"solidity"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[l("code",{"v-pre":""},[l("span",{class:"line"},[l("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"require"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(withdraw_amount "),l("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"<="),l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 0.1"),l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," ether"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},");")])])]),l("button",{class:"collapse"})],-1),l("div",{class:"warning custom-block"},[l("p",{class:"custom-block-title"},[l("span",{lang:"en"},"WARNING"),l("span",{lang:"zh-CN"},"注意")]),l("p",null,"Mappings can be seen as hash tables which are virtually initialized such that every possible key exists from the start and is mapped to a value whose byte-representation is all zeros. However, it is neither possible to obtain a list of all keys of a mapping, nor a list of all values. Record what you added to the mapping, or use it in a context where this is not needed. Or even better, keep a list, or use a more suitable data type.")],-1),l("hr",null,null,-1),l("p",null,"整形",-1),l("p",null,"支持",-1),l("ul",null,[l("li",null,[e("比较运算符："),l("code",null,"<="),e("，"),l("code",null,"<"),e("，"),l("code",null,"=="),e("，"),l("code",null,"!="),e("，"),l("code",null,">="),e("，"),l("code",null,">")]),l("li",null,[e("位运算符："),l("code",null,"&"),e("，"),l("code",null,"|"),e("，"),l("code",null,"^"),e("，"),l("code",null,"~")]),l("li",null,[e("位移运算符："),l("code",null,"<<"),e("，"),l("code",null,">>")]),l("li",null,[e("算术运算符："),l("code",null,"+"),e("，"),l("code",null,"-"),e("，"),l("code",null,"**"),e("……")])],-1),l("div",{class:"language-solidity vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"solidity"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[l("code",{"v-pre":""},[l("span",{class:"line"},[l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"int8"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," x")]),e(`
`),l("span",{class:"line"},[l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"type"),l("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(x).max "),l("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),l("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 127")])])]),l("button",{class:"collapse"})],-1),l("p",null,"Solidity 的除法是向 0 进位的，与常规的向下进位不太一致",-1),l("hr",null,null,-1),l("p",null,"函数类型",-1),l("p",null,[e("表示函数的类型，可以复制，可以作为参数可以做返回值，可以在函数中作为变量调用。存在 "),l("em",null,"内部（internal）"),e(" 和 "),l("em",null,"外部（external）"),e(" 两种类型。默认是内部类型可以省略，只针对于函数类型，合约中定义的函数，没有默认属性必须指明可见性。")],-1),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[l("code",{"v-pre":""},[l("span",{class:"line"},[l("span",null,"function (<parameter types>) {internal|external} [pure|view|payable] [returns (<return types>)]")])])]),l("button",{class:"collapse"})],-1),l("p",null,[e("返回类型不能为空，如果函数不需要返回，需要删除所有的 "),l("code",null,"returns (<return types>)"),e(" 部分。")],-1),l("h3",{id:"预定义的全局变量和函数",tabindex:"-1"},[e("预定义的全局变量和函数 "),l("a",{class:"header-anchor",href:"#预定义的全局变量和函数","aria-label":'Permalink to "预定义的全局变量和函数"'},"​")],-1),l("h4",{id:"调用交易-消息上下文",tabindex:"-1"},[e("调用交易/消息上下文 "),l("a",{class:"header-anchor",href:"#调用交易-消息上下文","aria-label":'Permalink to "调用交易/消息上下文"'},"​")],-1),l("p",null,[l("em",null,[l("strong",null,"msg")]),l("br"),l("em",null,"msg"),e(" 对象是启动合约执行的交易（源自EOA）或消息（源自合约）。它包含许多有用的属性：")],-1),l("p",null,[l("em",null,[l("strong",null,"msg.sender")]),l("br"),e(" 代表发起消息的地址。如果合约是由 EOA 交易调用的，那么这就是签署交易的地址")],-1),l("p",null,[l("em",null,[l("strong",null,"msg.gas")]),l("br"),e(" 调用合约消息中留下")],-1)])),"main-header":t(()=>[a(i.$slots,"main-header")]),"main-header-after":t(()=>[a(i.$slots,"main-header-after")]),"main-nav":t(()=>[a(i.$slots,"main-nav")]),"main-content-before":t(()=>[a(i.$slots,"main-content-before")]),"main-content":t(()=>[a(i.$slots,"main-content")]),"main-content-after":t(()=>[a(i.$slots,"main-content-after")]),"main-nav-before":t(()=>[a(i.$slots,"main-nav-before")]),"main-nav-after":t(()=>[a(i.$slots,"main-nav-after")]),comment:t(()=>[a(i.$slots,"comment")]),footer:t(()=>[a(i.$slots,"footer")]),aside:t(()=>[a(i.$slots,"aside")]),"aside-custom":t(()=>[a(i.$slots,"aside-custom")]),default:t(()=>[a(i.$slots,"default")]),_:3},8,["frontmatter"])}}};export{R as default,v as usePageData};