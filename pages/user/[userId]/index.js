import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import { useRouter } from 'next/router';
import middleware from '../../../middlewares/middleware';
import { useCurrentUser } from '../../../lib/hooks';
import { getUser } from '../../../lib/db';
import { useUser } from "../../../lib/hooks";
export default function UserPage({ user}) {
    const router = useRouter();
    
    const handleLogout = async () => {
      
        await fetch("/api/auth", {
          method: "DELETE",
        });
        // set the user state to null    
        router.push("/");
      //  mutate(null);
      
      };
    if (!user) router.push("/");
    const {
        name, email, bio, profilePicture,
    } = user || {};
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentUser] = useCurrentUser();
    const isCurrentUser = currentUser?._id === user._id;
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 p-3 d-flex align-items-center" style={{backgroundColor:'#5c9eff'}}>
                        <img src={profilePicture} className="img-fluid border border-2" style={{height:'auto'}}/>
                    </div>
                    <div class="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title text-center">Profile</h3>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className='card-title'>Name</h3>
                                    <div className="card-text">{name}</div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className='card-title'>Bio</h3>
                                    <div className="card-text">{bio}</div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3 className='card-title'>Email</h3>
                                    <div className="card-text">{email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='card-action text-center mb-3'>
                            <Link  href='/setting' style={{padding:10}}>Редактировать</Link>
                            <Link onClick={handleLogout}  href='/' style={{padding:10}}>Выйти</Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    await middleware.apply(context.req, context.res);
    const user = await getUser(context.req, context.params.userId);
    if (!user) context.res.statusCode = 404;
    return {
        props: {
            user,
        }, // will be passed to the page component as props
    };
}

