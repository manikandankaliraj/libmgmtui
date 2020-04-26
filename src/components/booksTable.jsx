import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class BooksTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: book => <Link to={`/books/${book.id}`}>{book.title}</Link>
    },
    { path: "author", label: "Author" }
  ];

  deleteColumn = {
    key: "delete",

    content: book => (
      <button
        onClick={() => this.props.onDelete(book)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    this.columns.push(this.deleteColumn);
  }

  render() {
    const { books, sortColumn, onSort } = this.props;

    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          data={books}
          onSort={onSort}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default BooksTable;
