import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogData, selectUserInput } from "../features/useSlice"; 
import axios from "axios";

//Material UI style
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const url = "https://gnews.io/api/v4/search?q="

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const searchInput = useSelector(selectUserInput); 
  const dispatch = useDispatch();

  const blog_url = `${url}${searchInput}&apikey=45246df9e5f220ed9d6d7eaaf12d3bcf`

  const fetchNews = () => {
      setIsLoading(true);
      axios
        .get(blog_url)
        .then((result) => {
          dispatch(setBlogData(result.data));
          setBlogs(result.data)
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
        })      
  }

  useEffect(() => {
    fetchNews()
  }, [searchInput])


  if (isLoading) {
    return (
      <Container sx={{  p: 3, mt: 5 }}>
        <h2>Blogs</h2>
        <Box sx={{ textAlign: 'center', m: 1 }}>
          <CircularProgress sx={{ color: 'grey.500' }}/>
        </Box>
      </Container>
    )
  }
  
  if (blogs?.articles?.length === 0) {
    return (
      <Container sx={{  p: 3, mt: 5 }}>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
        <h2>
        No blogs available 😞. Search something else to read blogs on the
        greatest platform.  
        </h2>
        </Box>
      </Container>
    )
  }

  return (
    <Container sx={{  p: 3, mt: 5 }}>
        <h2>Blogs</h2>
        <div className="grid">
        {
          blogs?.articles?.map((article, index) => {
            const { title, description, image, publishedAt, url } = article;
            return (
              <Card key={index} sx={{ maxWidth: 345, m: 2, height: 450 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={image}
                  title={title}
                />
                <CardContent sx={{ height: 200 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {`Date: ${publishedAt.substring(0, 10)}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
                    <b style={{fontWeight: 900, color: "#000"}}>{title}</b>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {`${description.substring(0, 110)}...`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small"
                    color="inherit" 
                    variant="outlined" 
                  >
                    <Link
                      href={url}
                      target="_blank"
                      color="inherit"
                      underline="none"
                    >
                    Read More
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            )
          })
        }
        </div>
    </Container>
  )
}
export default Blogs