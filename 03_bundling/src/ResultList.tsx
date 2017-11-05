import * as React from 'react'

interface IResultListProps {
  list: number[]
}

export class ResultList extends React.Component<IResultListProps, {}> {

  render() {
    const { list } = this.props

    return <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>Index</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { this.renderBody(list) }
        </tbody>
      </table>
  }

  renderBody(list: number[]) {
    return list.map((val, idx) => 
      <tr key={idx}>
        <td>
          { idx }
        </td>
        <td>
          { val }
        </td>
      </tr>
    )
  }
}