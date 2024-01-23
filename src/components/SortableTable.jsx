import PropTypes from 'prop-types'

function SortableTable(props) {
  const { tableData, columns, className } = props
  SortableTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
  }

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={Math.random()}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={Math.random()}>
              {columns.map((column) => (
                <td key={Math.random()}>
                  {row[column].constructor === Array && (
                    <SortableTable 
                      tableData={row[column]} 
                      columns={Object.keys(row[column][0])} />
                  )}
                  {typeof row[column] === 'object' && (
                    <SortableTable
                      tableData={[row[column]]}
                      columns={Object.keys(row[column])}
                    />
                  )}
                  {typeof row[column] === 'string' && (
                    row[column]
                  )}
                  {typeof row[column] === 'number' && (
                    row[column]
                  )}
                  {typeof row[column] === 'boolean' && (
                    row[column] ? 'Yes' : 'No'
                  )}
                </td>
              ))}
            </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default SortableTable