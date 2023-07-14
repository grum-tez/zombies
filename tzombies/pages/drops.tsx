import React, { useCallback, useState } from 'react'
import { TokenList } from '../components/Token'
import { CallResult } from '@completium/archetype-ts-types'
import { Alert, Button, Snackbar, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RedeemIcon from '@mui/icons-material/Redeem'
import { useTzombiesContext } from '../components/providers/TzombiesProvider'
import { useWertContext } from '../components/providers/WertProvider'

const Drops = () => {
  const Extra = useCallback(() => <></>, [])
  const [minted, setMinted] = useState<CallResult>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const { freeClaim, fetchInventory, tokenInfo } = useTzombiesContext()

  const { checkout } = useWertContext()

  const handleClaim = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const result = await freeClaim(id)
        setMinted(result)
        fetchInventory()
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? JSON.stringify(e))
      } finally {
        setLoading(false)
      }
    },
    [freeClaim, fetchInventory]
  )

  const handlePurchase = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        await checkout(id)
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? JSON.stringify(e))
      } finally {
        setLoading(false)
      }
    },
    [checkout]
  )

  const ClaimButton = useCallback(
    (id: number) => (
      <>
        {id === 1 ? (
          <Button
            disabled={loading}
            onClick={() => handlePurchase(id)}
            startIcon={<AddShoppingCartIcon />}
          >
            {loading ? 'In progress...' : 'Buy for 2ꜩ'}
          </Button>
        ) : (
          <Button
            disabled={loading}
            onClick={() => handleClaim(id)}
            startIcon={<RedeemIcon />}
          >
            {loading ? 'In progress...' : 'Claim for free'}
          </Button>
        )}
      </>
    ),
    [handleClaim, handlePurchase, loading]
  )

  return (
    <>
      <Snackbar open={!!minted} onClose={() => setMinted(undefined)}>
        <Alert severity={'success'}>Minted in {minted?.operation_hash}</Alert>
      </Snackbar>
      <Snackbar open={!!error} onClose={() => setError(undefined)}>
        <Alert severity={'error'}>Error: {error}</Alert>
      </Snackbar>
      <Typography variant="h4">Drops</Typography>
      <TokenList
        tokens={[...(tokenInfo?.keys() ?? [])]}
        actions={ClaimButton}
        onClick={handleClaim}
        extra={Extra}
      />
    </>
  )
}

export default Drops
