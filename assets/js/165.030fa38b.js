(window.webpackJsonp=window.webpackJsonp||[]).push([[165],{626:function(e,a,t){"use strict";t.r(a);var r=t(33),s=Object(r.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"key-concepts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#key-concepts"}},[e._v("#")]),e._v(" Key concepts")]),e._v(" "),t("h3",{attrs:{id:"high-level-design-diagram"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#high-level-design-diagram"}},[e._v("#")]),e._v(" High-level design diagram")]),e._v(" "),t("img",{attrs:{src:e.$withBase("/hf-high-lvl-diagram.svg")}}),e._v(" "),t("p",[e._v("The data processing consists of three phases.")]),e._v(" "),t("h3",{attrs:{id:"phase-1-parsing-and-construction-of-asts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#phase-1-parsing-and-construction-of-asts"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Phase 1. Parsing and construction of ASTs")])]),e._v(" "),t("p",[e._v("Formulas need to be parsed and represented as a so-called "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Abstract_syntax_tree",target:"_blank",rel:"noopener noreferrer"}},[e._v("Abstract Syntax Tree"),t("OutboundLink")],1),e._v(" (AST). For example, the AST for "),t("code",[e._v("7*3-SIN(A5)")]),e._v(" looks will look similar to this graph:")]),e._v(" "),t("img",{attrs:{src:e.$withBase("/ast.png")}}),e._v(" "),t("h3",{attrs:{id:""}},[t("a",{staticClass:"header-anchor",attrs:{href:"#"}},[e._v("#")]),e._v(" ****")]),e._v(" "),t("h3",{attrs:{id:"phase-2-construction-of-the-dependency-graph"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#phase-2-construction-of-the-dependency-graph"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Phase 2. Construction of the dependency graph")])]),e._v(" "),t("p",[e._v("HyperFormula needs to understand the relationship between cells and find the right order of processing them. For example, for a sample formula "),t("code",[e._v("C1=A1+B1")]),e._v(", it needs to process first "),t("code",[e._v("A1")]),e._v(" and "),t("code",[e._v("B1")]),e._v(" and then "),t("code",[e._v("C1")]),e._v(". Such an order of processing cells - also known as "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Topological_sorting",target:"_blank",rel:"noopener noreferrer"}},[e._v("topological order"),t("OutboundLink")],1),e._v(" - exists if and only if there is no cycle in the dependency graph.")]),e._v(" "),t("p",[e._v("There can be many such orders, like so:")]),e._v(" "),t("img",{attrs:{src:e.$withBase("/topsort.png")}}),e._v(" "),t("h3",{attrs:{id:"-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#-2"}},[e._v("#")]),e._v(" ****")]),e._v(" "),t("h3",{attrs:{id:"phase-3-evaluation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#phase-3-evaluation"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Phase 3. Evaluation")])]),e._v(" "),t("p",[e._v("It is crucial to evaluate cells efficiently. For simple expressions**,** there is not much room for maneuver, but spreadsheet-like data sets definitely need more attention.")]),e._v(" "),t("img",{attrs:{src:e.$withBase("/sample-sheet.png")}}),e._v(" "),t("h3",{attrs:{id:"grammar"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#grammar"}},[e._v("#")]),e._v(" Grammar")]),e._v(" "),t("p",[e._v("For this parsing purposes, the library uses the "),t("a",{attrs:{href:"http://sap.github.io/chevrotain/docs/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Chevrotain"),t("OutboundLink")],1),e._v(" parser, which turns out to be more efficient than popular "),t("a",{attrs:{href:"https://zaa.ch/jison/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jison"),t("OutboundLink")],1),e._v(". The language of acceptable formulas is described with a LL(k) grammar using Chevrotain Domain Specific Language. See details of the grammar in the "),t("a",{attrs:{href:"https://github.com/handsontable/hyperformula/blob/develop/src/parser/FormulaParser.ts",target:"_blank",rel:"noopener noreferrer"}},[e._v("FormulaParser"),t("OutboundLink")],1),e._v(" file.")]),e._v(" "),t("h3",{attrs:{id:"repetitive-asts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#repetitive-asts"}},[e._v("#")]),e._v(" Repetitive ASTs")]),e._v(" "),t("p",[e._v("A first natural optimization could concern cells in a spreadsheet which store exactly the same formulas. For such cells, there is no point in constructing and storing two ASTs which would be the same in the end. Instead, HyperFormula can look up the particular formula that has already been parsed and reuse the constructed AST.")]),e._v(" "),t("p",[e._v("A scenario with repeating formulas is somewhat idealized; in practice, most formulas will be distinct. Fortunately, formulas in spreadsheets usually have a defined structure and share some patterns. Especially, after filling cells using a fill handle (that little square in the bottom right corner of a visual cell representation), neighboring cells contain similar formulas, for example:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("B2=A2-C2+B1")])]),e._v(" "),t("li",[t("code",[e._v("B3=A3-C3+B2")])]),e._v(" "),t("li",[t("code",[e._v("B4=A4-C4+B3")])]),e._v(" "),t("li",[t("code",[e._v("B5=A5-C5+B4")]),e._v(" and so on...")])]),e._v(" "),t("p",[e._v("Although the exact ASTs for these formulas are different, they share a pattern. A very useful approach here is to rewrite a formula using relative addressing of cells.")]),e._v(" "),t("h3",{attrs:{id:"relative-addressing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#relative-addressing"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Relative addressing")])]),e._v(" "),t("p",[e._v("HyperFormula stores the offset to the referenced formula, for example "),t("code",[e._v("B2=B5+C1")]),e._v(" can be rewritten to "),t("code",[e._v("B2=[B+0][2+3]+[B+1][2-1]")]),e._v(" or in short "),t("code",[e._v("B2=[0][+3] + [+1][-1]")]),e._v(". Then, the above example with "),t("code",[e._v("B2,B3")]),e._v(" and "),t("code",[e._v("B4")]),e._v(" can be rewritten as "),t("code",[e._v("B2=B3=B4=[-1][0]-[1][0]+[0][-1]")]),e._v(" and now the three cells have exactly the same formulas.")]),e._v(" "),t("p",[e._v("By using relative addressing HyperFormula unifies formulas from many cells. Thanks to that, there is no need to parse them all over and over again. Also, with this approach, the engine doesn't lose any information because, knowing the absolute address of a cell and its formula with relative addresses, it can easily retrieve the absolute addresses and compute the value of the cell.")]),e._v(" "),t("h3",{attrs:{id:"laziness-of-crud-operations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#laziness-of-crud-operations"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Laziness of CRUD operations")])]),e._v(" "),t("p",[e._v("After each CRUD operation, like adding a row or column or moving cells, references inside formulas may need to be changed. For example, after adding a row, we need to shift all references in the formulas below like so:")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://lh4.googleusercontent.com/f5iIxRW8A_FIrZa8dcSayIvdVeuxznaZ7y8zzb5I3hRN2TvzeKKoFiV1rDmdLmXY2AjxToSZJVmya9drrcmvjRhEbKFr4jmQ9d14B0_2XGwKftbnMisly2gmxvxbvhrzr2U_FwvC",alt:""}})]),e._v(" "),t("p",[e._v("In more complex sheets this can lead to similar transformations in many formulas at once. On the other hand, such operations do not require an immediate transformation of all the affected formulas.")]),e._v(" "),t("p",[e._v("Instead of transforming all of them at once, HyperFormula remembers the history of the operations and postpones the transformations until the formula needs to be displayed or recalculated.")]),e._v(" "),t("h3",{attrs:{id:"handling-ranges"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#handling-ranges"}},[e._v("#")]),e._v(" Handling ranges")]),e._v(" "),t("p",[e._v("In many applications, you may want to use formulas that depend on a large range of cells. For example, the formula "),t("code",[e._v("SUM(A1:A100)+B5")]),e._v(" depends on 101 cells and it needs to be represented in the graph of cell dependencies accordingly.")]),e._v(" "),t("p",[e._v("An interesting optimization challenge arises when the are multiple cells that depend on large ranges. For example, consider the following use-case:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("B1=SUM(A1:A1)")])]),e._v(" "),t("li",[t("code",[e._v("B2=SUM(A1:A2)")])]),e._v(" "),t("li",[t("code",[e._v("B3=SUM(A1:A3)")])]),e._v(" "),t("li",[e._v("...")]),e._v(" "),t("li",[t("code",[e._v("B100=SUM(A1:A100)")])])]),e._v(" "),t("p",[e._v("The problem is that there are "),t("code",[e._v("1+2+3+...+100 = 5050")]),e._v(" dependencies for such a simple situation. In general, for "),t("code",[e._v("n")]),e._v(" such rows, the engine would need to add "),t("code",[e._v("n*(n+1)/2 ≈ n²")]),e._v(" arcs in the graph. This value grows much faster than the size of data, meaning the engine would not be able to handle large data sets efficiently.")]),e._v(" "),t("p",[e._v("A solution to this problem comes from the observation that there is a way to rewrite the above formulas to equivalent ones, which will be more compact to represent. Specifically, the following formulas would compute the same values as the ones provided previously:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("B1=A1")])]),e._v(" "),t("li",[t("code",[e._v("B2=B1+A2")])]),e._v(" "),t("li",[t("code",[e._v("B3=B2+A3")])]),e._v(" "),t("li",[e._v("...")]),e._v(" "),t("li",[t("code",[e._v("B100=B99+A100")])])]),e._v(" "),t("p",[e._v("Whereas this example is too specialized to provide a useful rule for optimization, it shows the main idea behind efficient handling of multiple ranges: "),t("strong",[e._v("to represent a range as a composition of smaller ranges.")])]),e._v(" "),t("p",[e._v("In the adopted implementation, every time the engine encounters a range, say "),t("code",[e._v("B5:D20")]),e._v(", it checks if it has already considered the range which is one row shorter. In this example, it would be "),t("code",[e._v("B5:D19")]),e._v(". If so, then it represents "),t("code",[e._v("B5:D20")]),e._v(" as the composition of a range "),t("code",[e._v("B5:D19")]),e._v(" and three cells in the last row: "),t("code",[e._v("B20")]),e._v(","),t("code",[e._v("C20")]),e._v(" and "),t("code",[e._v("D20")]),e._v(".")]),e._v(" "),t("img",{attrs:{src:e.$withBase("/ranges.png")}}),e._v(" "),t("p",[e._v("More generally, the result of any associative operation is obtained as the result of operations for these small rows. There are many examples of such associative functions: "),t("code",[e._v("SUM")]),e._v(", "),t("code",[e._v("MAX")]),e._v(", "),t("code",[e._v("COUNT")]),e._v(", etc. As one range can be used in different formulas, we can reuse its node and avoid duplicating the work during computation.")])])}),[],!1,null,null,null);a.default=s.exports}}]);