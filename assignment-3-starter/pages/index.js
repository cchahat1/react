import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';

import NavBar from '../components/NavBar'
import Title from '../components/Title'
import FavouriteBooks from '../components/FavouriteBooks'

import { useState } from 'react'



const FAVOURITE_BOOKS = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    rating: 9
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 8
  }
]

console.log("hi")

export default function Home() {
  const [books, setBooks] = useState(FAVOURITE_BOOKS)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [rating, setRating] = useState("")
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()

    //setBooks([...books, { title, author, rating }])
    if (title === "" || author === "" || rating === "") {
      setErrorMessage(true)
    }
    else {
      setErrorMessage(false)
      setBooks([...books, { title, author, rating }])
      //reset the form
      setAuthor("")
      setRating("")
      setTitle("")
      FAVOURITE_BOOKS.push(books)
    }
  }

  return (
    <div>
      <Head>
        <title>Library App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title={"Our Library"} />
      <main>
        <Container sx={{ paddingTop: '2rem' }} maxWidth="md">
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', marginBottom: "2rem" }}>
            <Title>Add a New Favourite</Title>

            <form
              onSubmit={handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //required
                    id="title"
                    name="title"
                    label="Book Title"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                  />
                </Grid>
                <Grid item xs={10} sm={4}>
                  <TextField
                    // required
                    id="author"
                    name="author"
                    label="Author"
                    fullWidth
                    variant="standard"
                    value={author}
                    onChange={(event) => { setAuthor(event.target.value) }}
                  />
                </Grid>
                <Grid item xs={10} sm={4}>
                  <TextField
                    //required
                    id="rating"
                    name="rating"
                    label="Rating"
                    fullWidth
                    variant="standard"
                    value={rating}
                    onChange={(event) => { setRating(event.target.value) }}
                  />
                </Grid>

                <Grid item xs={2} sm={2}>
                  <Button variant="contained" sx={{ mt: 1.5, ml: 1 }} type="submit">Add</Button>
                </Grid>

              </Grid>
            </form>
            {errorMessage && (
              <Alert severity="error">
                Please enter all the values.
              </Alert>
            )}
          </Paper>
          <FavouriteBooks books={books} />
        </Container>
      </main>
    </div>
  )
}
