## [Deployment][1] - 2018-01-30

1. [README][2]

2. Repo contents
```bash
$ ls -l
total 32
-rw-r--r--   1 jpowell  staff   373 May 12  2015 Capfile
-rw-r--r--   1 jpowell  staff   148 Jan 20  2016 Gemfile
-rw-r--r--   1 jpowell  staff   853 Jan 20  2016 Gemfile.lock
-rw-r--r--   1 jpowell  staff  2349 Aug  4 15:59 README.md
drwxr-xr-x  10 jpowell  staff   340 Apr 10  2017 brightsign
drwxr-xr-x   8 jpowell  staff   272 Mar 30  2017 churchleadersconference.com
drwxr-xr-x  11 jpowell  staff   374 Dec 21 16:50 heroku
drwxr-xr-x   7 jpowell  staff   238 Apr 24  2017 hr
drwxr-xr-x   4 jpowell  staff   136 May 12  2015 lib
drwxr-xr-x   8 jpowell  staff   272 Aug  3 16:33 signage
drwxr-xr-x   7 jpowell  staff   238 Apr 24  2017 staff
```

3. heroku directory - where the magic happens

```bash
$ tree
.
├── Gemfile
├── Gemfile.lock
├── README.md
├── Rakefile
├── apps
│   ├── events.yml.enc
│   ├── example.yml
│   ├── jtj-cms.yml.enc
│   ├── jtj-com.yml.enc
│   ├── media.yml.enc
│   ├── membership.yml.enc
│   ├── nucleus.yml.enc
│   ├── patterns.yml.enc
│   ├── survey.yml.enc
│   ├── tessa.yml.enc
│   ├── theporch.yml.enc
│   └── wmorg.yml.enc
├── certs
│   ├── wildcard.watermark.org.crt.enc
│   └── wildcard.watermark.org.key.enc
└── errors
    ├── error.html
    └── maintenance.html
```
  - setup `sekrets`
  - `rake -T`
  - Tasks broken down by type
    - setting up app pipelines
      - `add_to_pipeline`
      - `setup_pipeline`
    - editing app config
      - `edit`
      - `show`
    - saving app config
      - `db:schedule_backups`
      - `save_cert`
      - `save_domains`
      - `save_drains`
      - `save_env`
      - `save_maint`
      - `update_cert`
      - `update_all_certs`
      - `setup` (runs all save)
    - `db` commands
      - `backup`
      - `restore_all_staging`
      - `restore_local`
      - `restore_staging`
      - `seed_nucleus_staging` (used by restore_all_staging)
  - Run through pipeline set up!


[1]: https://github.com/watermarkchurch/deployment
[2]: https://github.com/watermarkchurch/deployment/blob/master/README.md
