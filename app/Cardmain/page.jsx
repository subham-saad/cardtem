"use client"

import { useState } from 'react';
import { Avatar, Text, Button, Paper, Group, Anchor, Tooltip } from '@mantine/core';
import { IconPhoneCall, IconAt, IconWorldWww, IconUserPlus,IconTrash, IconUserMinus, IconStar } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';
import linksstyle from './Link.module.css'
import { motion } from 'framer-motion';
import { Tilt } from "react-tilt";
import cardmodule from './Card.module.css'

// interface CardProps {
//   user: {
//     name: string;
//     email: string;
//     phone: string;
//     website: string;
//   };
//   onDelete: () => void;
// }


function generateAvatarUrl(userName) {
    const apiUrl = 'https://api.dicebear.com/7.x/initials/svg';
    const seed = encodeURIComponent(userName);
    return `${apiUrl}?seed=${seed}`;
  } 

 
  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  


 function Cardmain({ user, onDelete })  {
    
   const [isFollowing, setIsFollowing] = useState(false);

   const handleFollowToggle = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };
    const avatarUrl = generateAvatarUrl(user.name);
    return (
  <Tilt className='xs:w-[250px] w-full'>
  <motion.div
      variants={fadeIn("right", "spring",  0.5, 0.75)}
      // className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      className={cardmodule.gree}
    >
    <Group wrap="wrap" justify='center'>
      <Paper radius="md" withBorder p="lg" w={280}  bg="var(--mantine-color-body)">
          <Avatar src={avatarUrl} alt={`Avatar for ${user.name}`}  size={110} radius={110} mx="auto" />
        <Text ta="center" fz="lg" p="md" fw={500} mt="md">
          {user.name}{isFollowing?<motion.i  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }} style={{ paddingLeft:6, paddingTop:2}}><IconStar color='#000000'  size="1rem" className={classes.icon}/></motion.i>:null}
        </Text>
        <Tooltip label={user.email}  position='top'  offset={{ mainAxis: -5, crossAxis: -50 }}>
        <Group wrap="nowrap" gap={4} mt={3}>
        <IconAt stroke={1.5} size="1rem" className={classes.icon} />
        <Text ta="center" c="dimmed" fz="sm">
        <Anchor target='_blank' underline='hover' c='dimmed' type='email' href={`mailto:${user.email}`} >
            {user.email} 
        </Anchor>
        </Text>
  
        </Group>
        </Tooltip>
        <Tooltip label={'Call Me'}  position='top'  offset={{ mainAxis: -25, crossAxis: 60 }}>
        <Group wrap="nowrap" gap={4} mt={3}>
        <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
        <Text ta="center" c="dimmed" fz="sm">
        <Anchor target='_blank' underline='hover' c='dimmed'  href={`tel:${user.phone}`}>
          {user.phone}
        </Anchor> 
        </Text>
  
      </Group>
      </Tooltip>
        <Group wrap="nowrap" gap={4} mt={3}>
        <IconWorldWww stroke={1.5} size="1rem" className={classes.icon} />
       
      <Text ta="center" c="dimmed" fz="sm">
        <a className={linksstyle.customLink} href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </Text>  
        </Group>
        <Group  wrap="nowrap" gap={4} mt={3}>
       
        {isFollowing ? (
          <motion.div whileTap={{ scale: 2 }}>
            <Button variant="default" fullWidth mt="md" onClick={handleFollowToggle}>
              <IconUserMinus color="#000000" stroke={1.5} size="1rem" className={classes.icon} />
              <span style={{ color: '#000000', paddingLeft: '10px' }}>Unfollow</span>
            </Button>
          </motion.div>
          ) : (
          <motion.div whileTap={{ scale: 2 }}>
            <Button variant="primary" fullWidth mt="md" onClick={handleFollowToggle}>
              <IconUserPlus color="white" stroke={3} size="1rem" className={classes.icon} />
              <span style={{ paddingLeft: '10px' }}>Follow</span>
            </Button>
            </motion.div>
          )}
      <motion.div whileTap={{ scale: 2 }}>
        <Button px={24} variant="default" fullWidth mt="md" onClick={onDelete}>
          <IconTrash color='#3498DB' stroke={1.5} size="1rem" className={classes.icon} /> 
          <span style={{color:"#3498DB", paddingLeft:"10px"}}>Delete</span>
        </Button>
      </motion.div>
        </Group>
      </Paper>
  
      </Group>
      </ motion.div>
      </Tilt>
    );
  }

  export default Cardmain