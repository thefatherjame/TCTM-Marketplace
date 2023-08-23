// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Tab, Card, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Components
import MemberTable from 'src/views/admin/manager/MemberTable'
import SupplierTable from 'src/views/admin/manager/SupplierTable'
import axios from 'axios'

const ManagerPage = ({ dataUser, dataMarket }) => {
  // ** States
  const [value, setValue] = React.useState('1')

  // ** Function to handle tabs
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h5' color='primary'>
          TCTM Manager
        </Typography>
        <Typography variant='body2'>Membership approval management page</Typography>
      </Box>
      <Card sx={{ width: '100%' }}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='User' value='1' />
                <Tab label='Marketplace' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <MemberTable rows={dataUser} />
            </TabPanel>
            <TabPanel value='2'>
              <SupplierTable rows={dataMarket} />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export const getServerSideProps = async context => {
  // ** The code block you provided is an asynchronous function that fetches data from two different
  // ** endpoints using the axios library. It makes two GET requests to the same endpoint with different headers.
  try {
    const userResponse = await axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.approve.userqueue', {
      headers: {
        Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
      }
    })

    const marketResponse = await axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.approve.supplierqueue', {
      headers: {
        Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
      }
    })

    const dataUser = userResponse.data.message.Data
    const dataMarket = marketResponse.data.message.Data

    return {
      props: {
        dataUser: dataUser || [],
        dataMarket: dataMarket || []
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        dataUser: [],
        dataMarket: []
      }
    }
  }
}

export default ManagerPage