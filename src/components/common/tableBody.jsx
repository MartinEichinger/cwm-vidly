import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              {columns.map((column, i) => {
                if (i === 0) {
                  let link = `/movies/${item._id}`;
                  return (
                    <td key={i}>
                      <Link to={link}>{this.renderCell(item, column)}</Link>
                    </td>
                  );
                }
                if (i > 0) {
                  return <td key={i}>{this.renderCell(item, column)}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
