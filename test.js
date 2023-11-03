let INSdata = msg.INSdata;
let refmaster =  msg.refmaster;
let data =  msg.payload;
let status = data[0].ItemStatus;
let dt = new Date();
let D01NOitem = INSdata[0]['D01NOitem'] || '';
let D02NOitem = INSdata[0]['D02NOitem'] || '';

function convertformat(input){
  let curr_dt = input;
  let form_dt = curr_dt.getFullYear() + "-" + (curr_dt.getMonth() + 1) + "-" + curr_dt.getDate() + " " + curr_dt.getHours() + ":" + curr_dt.getMinutes() + ":" + curr_dt.getSeconds();
  return form_dt;
}

query3 = `
UPDATE [SAR].[dbo].[Instrument_Sludge]
ItemStatus = '${status}',
UserAnalysis = ''${refmaster['USER']}',',
UserAnalysisBranch = '${refmaster['Branch']}',
AnalysisDate = '${convertformat(dt)}',
No_1 = '${D01NOitem}',
UsedSample_1 = ${INSdata[0][`data01_volum`][`volum`]},
W1_1 = '${INSdata[0][`data01`][`W11`]}',
W2_1 = '${INSdata[0][`data01`][`W21`]}',
W1W2_1 = '${INSdata[0][`data01_volum`][`D01W11_21`]||''}',
ResultSymbol_1 = '${data[0].ResultSymbol_1||''}',
Result_1 = '${INSdata[0][`data01_ans`][`ans`]||''}',
ResultUnit_1, = '${"ppm"}',
ResultRemark_1 = '${data[0].ResultRemark_1||''}',
ResultFile_1 = '${data[0].ResultFile_1||''}',,
No_2 = '${D02NOitem}',
UsedSample_2 = '${INSdata[0][`data02_volum`][`volum`]}',
W1_2 = '${INSdata[0][`data02`][`W11`]}',
W2_2 = '${INSdata[0][`data02`][`W21`]}',
W1W2_2 = '${INSdata[0][`data02_volum`][`D02W11_21`]||''}',
ResultSymbol_2 = '${data[0].ResultSymbol_2||''}',
Result_2 = '${INSdata[0][`data02_ans`][`ans`]||''}',
ResultUnit_2 = '${"ppm"}',
ResultRemark_2 = '${data[0].ResultRemark_2||''}',
ResultFile_2 = '${data[0].ResultFile_2||''}',
WHERE  RequestSample_ID = '${refmaster['UID']}'

`

msg.payload = query3;
return msg;