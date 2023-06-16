import { OpenAI } from "langchain/llms";
import { BaseChain, LLMChain, loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders";

import { MarkdownTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain";

export const generate = async ({ input, selectedTemplate }) => {
  try {
    const model = new OpenAI({ temperature: 0.9 });

    const template =
      "{syntax} - {instructions} 从上面的语法中学习并写作 {template} 在 mermaid 语法中关于 {input}?";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["template", "input", "syntax", "instructions"],
    });

    const chain = new LLMChain({ llm: model, prompt });

    // @ts-ignore
    const syntaxDoc = await import(
      `./syntax/${selectedTemplate.toLowerCase()}.md`
    );

    const res = await chain.call({
      template: selectedTemplate,
      input,
      syntax: syntaxDoc.default,
      instructions: `
      - 使用不同的形状，颜色，并尽可能使用图标，如文件中提到的.
      - 严格的规则:不添加注释，不解释代码，不添加除代码以外的任何额外文本, 
      - 不要使用'end'语法,
      - 不要在块内使用任何括号,
      - 用中文进行回复!
      `,
    });

    return res;
  } catch (e) {
    console.log("openai:debug", e?.response?.data);
    throw e;
  }
};
