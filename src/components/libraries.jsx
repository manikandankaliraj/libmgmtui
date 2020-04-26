import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import BooksTable from "./booksTable";
import { getLibraries } from "./../services/libService";
import { getBooks, deleteBook } from "./../services/bookService";
import { toast } from "react-toastify";
import { paginate } from "./../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";

class Libraries extends Component {
  state = {
    books: [],
    libraries: [],
    currentPage: 1,
    pageSize: 4,
    selectedLibrary: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getLibraries();
    const { data: booksData } = await getBooks();
    const libraries = [{ id: "", name: "All Libraries" }, ...data];
    this.setState({ books: booksData, libraries });
  }

  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async book => {
    const orginalBooks = this.state.books;
    const books = orginalBooks.filter(bk => bk.id !== book.id);
    this.setState({ books });
    try {
      await deleteBook(book.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Book already deleted");
      }
      this.setState({ orginalBooks });
    }
  };

  handleLibrarySelect = library => {
    this.setState({ selectedLibrary: library, currentPage: 1, searchKey: "" });
  };

  getPaginatedData = () => {
    const {
      currentPage,
      pageSize,
      selectedLibrary,
      books: allBooks,
      sortColumn
    } = this.state;

    let filteredBooks = allBooks;

    if (selectedLibrary && selectedLibrary.id) {
      //Filtering Boooks
      filteredBooks = allBooks.filter(m => m.libraryId === selectedLibrary.id);
    }

    const sortedBooks = _.orderBy(
      filteredBooks,
      [sortColumn.path],
      [sortColumn.order]
    );

    //Pagination
    const books = paginate(sortedBooks, currentPage, pageSize);
    return { totalCount: filteredBooks.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const { currentPage, pageSize, sortColumn } = this.state;

    if (count === 0)
      return <p className="h6">There are no books in the cart</p>;

    const { totalCount, data: books } = this.getPaginatedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.libraries}
            selectedItem={this.state.selectedLibrary}
            onItemSelect={this.handleLibrarySelect}
          />
        </div>
        <div className="col">
          <Link to="/books/new" className="btn btn-primary m-2">
            New Book
          </Link>
          <p className="h6 m-2 ">Showing {totalCount} books in the database</p>

          <BooksTable
            books={books}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

export default Libraries;
