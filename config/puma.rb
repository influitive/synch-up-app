# see https://github.com/puma/puma for details
min_threads = Integer(ENV['WEB_MIN_THREADS'] || 8)
max_threads = Integer(ENV['WEB_MAX_THREADS'] || 32)

threads min_threads, max_threads
workers Integer(ENV['WEB_WORKERS'] || 3)
