export enum TemplateEnum {
  FLOWCHART = "FLOWCHART",
  MINDMAP = "MINDMAP",
  TIMELINE = "TIMELINE",
  USERJOURNEY = "USERJOURNEY",
  CLASS = "CLASS",
  ENTITYRELATIONSHIP = "ENTITYRELATIONSHIP",
  SEQUENCE = "SEQUENCE",
  STATE = "STATE",
}

const commonRules = `- 严格的规则:不添加注释，不解释代码，不添加任何额外的文本，除了代码，不使用'end'语法
        - 不要在块内使用任何括号`;

export const promptByTemplate = {
  [TemplateEnum.FLOWCHART]: (input: string) => `写流程图 ${input} 
        ${commonRules}
        例如:  correct: C -->|true| D(setLoading), wrong: correct: C -->|true| D(setLoading=>true)
        例如:  correct: C -->|true| D(axios.post=>'/api/ask', input), wrong: C -->|true| D(axios.post('/api/ask', {input,}))
        例如:  correct: J -->|text| L[Print 'number is not a prime number'] wrong: J -->|| L[Print 'number is not a prime number']
        `,

  [TemplateEnum.MINDMAP]: (input: string) => `写思维导图 ${input} 
        ${commonRules}
         syntax:
                
        `,
};
