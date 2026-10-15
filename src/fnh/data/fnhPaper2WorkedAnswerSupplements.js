// Source: user-supplied "FNH_Paper2_Worked_Answers(2).docx" (2026 section).
// Non-CXC worked examples for teacher-assisted review, not extra automatic marks.
// Keys use the source year, printed question number and SPARK part id.
export const FNH_P2_WORKED_SUPPLEMENTS=Object.freeze({
  2026:{
    1:{
      "a":"A vulnerable group has greater risk of diet-related health problems because of higher nutrient needs or reduced access to food and care.",
      "b-i":"Accept protein-energy malnutrition such as marasmus or kwashiorkor, particularly after early weaning onto low-energy foods.",
      "b-ii":"Accept iron-deficiency anaemia or folate deficiency during pregnancy.",
      "b-iii":"Accept osteoporosis associated with calcium/vitamin D inadequacy; constipation due to low fibre and fluid is another valid example.",
      "b-iv":"Accept undernutrition or nutritional deficiency, including anaemia, caused by limited access to varied food.",
      "c-i":"Disease A: diabetes mellitus. Disease B: hypertension. Give one mark per correct identification.",
      "c-ii":"Accept reducing energy-dense food and sugary drinks, choosing balanced portions, or regular appropriate physical activity. Award no more than two distinct ways.",
      "d":"Discuss TWO developed threats, for example poor mobility limiting access to markets and low income limiting nutritious purchases. Other valid factors include difficulty cooking, poor community support and conditions affecting appetite. An identified threat alone is not a complete six-mark discussion."
    },
    2:{
      "a":"Energy; growth and tissue repair; protective and regulatory functions. Social and psychological benefits are also acceptable if the question permits broad functions of food.",
      "b":"Carbohydrates, proteins and fats (lipids).",
      "c-i":"A menu dominated by white fish, potatoes, dairy, vegetables and crème caramel may not supply much iron. Explain one relevant reason clearly; coffee can inhibit non-haem iron absorption.",
      "c-ii":"Examples include steamed callaloo or spinach with tomatoes, and pak choi with sweet pepper. Other appropriate non-starchy iron-containing vegetable dishes are acceptable; explain nutritional value or vitamin C support.",
      "c-iii":"Include vitamin C from tomato, sweet pepper or lime to assist plant-iron absorption; avoid serving tea or coffee alongside the meal, and cook vegetables briefly to preserve vitamin C. Accept other correct precautions supported by reasons."
    }
  }
});
export function fnhWorkedSupplement(year,questionNumber,partId){
  return FNH_P2_WORKED_SUPPLEMENTS[Number(year)]?.[Number(questionNumber)]?.[String(partId)]||null;
}
