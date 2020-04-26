import http from "./httpservices";
import config from "../config.json";
const apiEndPoint = config.apiEndPoint + "/books";

function bookUrl(bookId) {
  return `${apiEndPoint}/${bookId}`;
}
export function getBooks() {
  return http.get(apiEndPoint);
}

export function getBook(bookId) {
  return http.get(bookUrl(bookId));
}

export function saveBook(book) {
  if (book.id) {
    const body = { ...book };
    delete body.id;
    return http.put(bookUrl(book.id), body);
  }
  return http.post(apiEndPoint, book);
}

export function deleteBook(id) {
  return http.delete(bookUrl(id));
}
