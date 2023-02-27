import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

import React, { Component, useState } from "react";
/*
  Next.js-Mongodb-Authentication-App start
  */
  import { useUser } from "../lib/hooks";
import Landing from '../components/header/Landing'
  /*
    Next.js-Mongodb-Authentication-App finish
    */
export default function Home({}) {


  return (
    
    <Landing />

  
  )
  
}
