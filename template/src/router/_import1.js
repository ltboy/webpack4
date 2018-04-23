let _import

_import =
  process.env.NODE_ENV === 'production'
    ? function(path, chunkName) {
      return require.ensure(
        [],
        require => require('@/views/' + path),
        chunkName
      )
    }
    : function(path, chunkName) {
      return require('@/views/' + path)
    }

export default function(path, chunkName) {
  let file = _import(path, chunkName)
  return file.default || file
}
