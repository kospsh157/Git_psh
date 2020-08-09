import React from 'react';
import DataTable, {} from 'react-data-table-component'
import styled from 'styled-components';

let no = 0;
function DateToString(DateObj) {
  let year = DateObj.getFullYear().toString();
  let month = DateObj.getMonth() + 1;
  let day = DateObj.getDate().toString();
  let hour = DateObj.getHours().toString();
  let minute = DateObj.getMinutes().toString();
  return year + "-" + month + "-" + day + "  " + hour + ":" + minute
}

const data = [
  { id: 1, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 2, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 3, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 4, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 5, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 6, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 7, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 8, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 9, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 10, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 11, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 12, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "123456789 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 13, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 14, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "221E05744 전동1.5톤C/B", 
  error:"미정의 알람", customer : 	"113627 살팡 주식회사-동탄HUB" ,  driver : ""  },
  { id: 15, title: 'Conan the Barbarian', date: DateToString(new Date()), device : "abc", 
  error:"미정의 에러", customer : 	"113627 쿠팡 주식회사-동탄HUB" ,  driver : ""  },

];
const columns = [
  {
    name: 'No.',
    selector: () => no+=1,
    sortable: true,
    center: true
  },
  {
    name: '발생일시',
    selector: 'date',
    sortable: true,
    
    center: true
  },
  {
    name: '장비',
    selector: 'device',
    sortable: true,
    center: true,
    cell : (row) => <a href = "" target = "_blank">{row.device}</a>
  },
  {
    name: '에러',
    selector: 'error',
    sortable: true,
    
    center: true
  },
  {
    name: '업체',
    selector: 'customer',
    sortable: true,
    center: true
  },
  {
    name: '운전자',
    selector: 'driver',
    sortable: true,
    center: true
  },
  {
    name: 'ACK',
    sortable: false,
    button:true,
    center: true,
    cell:()=><button>처리</button>
  },
];
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} />
    <button type="button" onClick={onClear}> X </button>
  </>
);

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;




// 배열을 액셀형태로 만들어 주는 함수
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// 엑셀 파일 다운로드
function downloadCSV(array) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;utf-8,\uFEFF' + csv;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}

// 엑셀 다운로드 컴포넌트 
const Export = ({ onExport }) => (
  <button onClick={e => onExport(e.target.value)}>Export</button>
);

function App() {
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(item => item.device && item.device.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);








  return (
    
    <DataTable
      title = '실시간 장비 에러 현황'
      columns = {columns}
      data = {data}
      pagination = {true}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      actions={actionsMemo}
    ></DataTable>
    
  );
}

export default App;
