import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getLibraries } from "./../services/libService";
import { saveBook, getBook } from "./../services/bookService";

class BookForm extends Form {
  state = {
    data: { title: "", libraryId: "", author: "" },
    errors: {},
    libraries: []
  };

  async populateLibraries() {
    const { data: libraries } = await getLibraries();
    this.setState({ libraries });
  }

  async populateBookData() {
    const bookId = this.props.match.params.id;
    if (bookId === "new") return;

    try {
      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book) });
    } catch ({ response }) {
      if (response && response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateLibraries();
    await this.populateBookData();
  }

  mapToViewModel(book) {
    return {
      id: book.id,
      title: book.title,
      libraryId: book.libraryId,
      author: book.author
    };
  }

  schema = {
    id: Joi.number(),
    title: Joi.string()
      .required()
      .label("Title"),
    author: Joi.string()
      .required()
      .label("Author"),
    libraryId: Joi.number()
      .required()
      .label("Library")
  };

  doSubmit = async () => {
    await saveBook(this.state.data);
    this.props.history.push("/libraries");
  };

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("libraryId", "Library", this.state.libraries)}
          {this.renderInput("author", "Author")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
