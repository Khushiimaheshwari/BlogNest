import React, {useEffect, useState} from 'react'
import Container from '../componenets/Container/Container';
import PostForm from '../componenets/post-form/PostForm';
import service from "../appwrite/config_service";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8 lg:px-10 md:px-8 smd:px-10 sm:px-5'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost