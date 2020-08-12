function TestTable(props) {

    const colList = props.colList.map(
        (item, index) => {
            return (<th><span key={index} className="hint--top" aria-label="번호">{item}</span></th>)
        }
    )

    return (
        <tr>
            {coList}
        </tr>
    )
}




function container() {


    return (
        <TestTable
            colList={["발생일시", "복구일시", "장비", "에러", "업체", "운전자"]}

        />
    )

}