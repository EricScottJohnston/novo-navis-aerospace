export default function Report() {
  return null
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: true
    }
  }
}
