## [Deployment][1] Lunch & Learn - 2018-01-30

Order of ops as follows:

1. Quick run through the [README][2]
2. `tree` repo structure
  - heroku
  - legacy apps
  - brightsign
  - other stuff...
3. heroku directory
  1. setup `sekrets`
  2. `rake -T`
    ```bash
    add_to_pipeline[app,env]      # Add this environment app to the appropriate pipeline
    db:backup[app,env]            # Perform fresh backup on environment app
    db:restore_all_staging        # Refresh all staging apps with production data
    db:restore_local[app,env]     # Restore local db to latest environment app backup
    db:restore_staging[app]       # Restore staging db to latest production backup
    db:schedule_backups[app,env]  # Schedule backups if configured for this app environment
    db:seed_nucleus_staging       # Create Nucleus staging apps
    edit[app]                     # Edit configuration for the given app in EDITOR
    save_cert[app,env]            # Save the configured cert to the environment app
    save_domains[app,env]         # Save the domains configured for the environment app
    save_drains[app,env]          # Save the configured drains to the environment app
    save_env[app,env]             # Save the environment vars (config vars) for the environment app
    save_maint[app,env]           # Save maintenance window to the environment app
    setup[app,env]                # Run all save tasks
    setup_pipeline[app]           # Bootstrap entire pipeline from scratch and configure each app
    show[app]                     # Show configuration for the given app in STDOUT
    update_all_certs[env]         # Update all certs for an environment
    update_cert[app,env,force]    # Update an existing cert for the environment app
    ```
  3. Tasks broken down by type
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


[1]: https://github.com/watermarkchurch/deployment
[2]: https://github.com/watermarkchurch/deployment/blob/master/README.md
