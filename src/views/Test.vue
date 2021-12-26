Simple, [10.12.2021 15:27]
<template>
  <div class="personal-feed-form">
    <div class="block">
      <div class="entity-nav title-entity-nav">
        <span
          class="go-back-button ifont icon-shevron-left"
          @click="$router.back()"
        ></span>
        <div class="entity-nav-title">
          <span v-if="!feed.id">{{ $t("feedCreation.l_title") }}</span>
          <span v-else>{{ $t("feedCreation.l_titleUpdate") }}</span>
        </div>
      </div>
      <div
        class="
          block-inner block-inner-no-bottom-padding block-inner-with-bottom-line
        "
      >
        <div class="careful-tip" v-if="!disabled_to_update">
          {{ $t("feedCreation.m_beCareful") }}
          <span class="ifont icon-warning2"></span>
        </div>

        <div class="careful-tip" v-if="disabled_to_update">
          {{ $t("feedCreation.m_disabledWhenChannelIsActiveOrModeration") }}
          <span class="ifont icon-warning2"></span>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <div
              class="form-group"
              v-bind:class="{ disabled: disabled_to_update }"
            >
              <label
                >{{ $t("feedCreation.l_name") }}
                <span class="main-color">*</span></label
              >
              <input
                class="form-control custom-input"
                type="text"
                v-model="feed.name"
                maxlength="60"
              />
            </div>
            <div class="mini-tip">
              {{ $t("feedCreation.m_max60Symbols") }} ({{
                (feed.name && feed.name.length) || 0
              }}
              / 60)
            </div>
          </div>
          <div class="col-12 col-md-3"></div>
          <div class="col-12 col-md-3">
            <div class="form-group clearfix">
              <label>{{ $t("feedCreation.l_image") }}</label>
              <div class="button-upload-cnt">
                <button
                  v-bind:disabled="image_loading"
                  @click="$refs.fileUploadInput.click()"
                  class="btn btn-tm btn-tm-big"
                >
                  <i class="ifont icon-upload"></i>
                  {{ $t("feedCreation.l_selectImage") }}
                </button>
                <input
                  ref="fileUploadInput"
                  type="file"
                  hidden
                  @change="changeImage"
                />

                <div class="feed-image">
                  <div
                    v-if="!feed.description.image_url"
                    class="ifont icon-blank-avatar"
                  ></div>
                  <img v-else v-bind:src="feed.description.image_url" />
                  <span v-if="image_loading" class="loader-container"
                    ><img
                      class="loader rotating"
                      src="/static/images/loading.svg"
                  /></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label
                >{{ $t("feedCreation.l_description") }}
                <span class="main-color">*</span></label
              >
              <div class="mini-tip-top">
                {{ $t("feedCreation.m_descriptionTip") }}
              </div>
              <input
                class="form-control custom-input"
                type="text"
                v-model="feed.description.text"
                maxlength="200"
              />
            </div>
            <div class="mini-tip">
              {{ $t("feedCreation.m_max200Symbols") }} ({{
                (feed.description.text && feed.description.text.length) || 0
              }}
              / 200)
            </div>
          </div>
        </div>

        Simple, [10.12.2021 15:27]
        <div class="row">
          <div class="col-12 col-md-6">
            <div
              class="form-group use-mini-multiselect"
              v-bind:class="{ disabled: disabled_to_update }"
            >
              <label
                >{{ $t("feedCreation.l_feedType") }}
                <span class="main-color">*</span></label
              >
              <multiselect
                class="tasks-custom-multiselect multiselect-36"
                v-model="feed.usage_type"
                :options="feed_types"
                :close-on-select="true"
                :show-labels="false"
                :allow-empty="false"
                :track-by="'label'"
              >
                <template slot="caret" slot-scope="{ option }">
                  <span class="multiselect__caret">
                    <span class="ifont icon-shevron-right"></span>
                  </span>
                </template>
                <template slot="singleLabel" slot-scope="{ option }">
                  {{ $t("feedCreation.l_" + option.label) }}
                </template>
                <template slot="option" slot-scope="{ option }">
                  {{ $t("feedCreation.l_" + option.label) }}
                </template>
              </multiselect>
            </div>
            <div class="mini-tip">
              {{ $t("feedCreation.m_manualRobot") }}
              <div>
                <a target="_blank" href="https://github.com/trade-mateio/api"
                  >https://github.com/trade-mateio/api</a
                >
              </div>
            </div>
          </div>
        </div>

        <!-- свич для вебхука -->
        <div class="row" v-if="feed.usage_type.label !== 'ROBOT'">
          <div class="col-12">
            <div class="form-group">
              <div
                id="web_hook_enabled"
                style="width: 330px"
                :tooltip="
                  !isProPaymentPlan
                    ? $t('profile.tt_do_not_support_on_payment_plan')
                    : false
                "
                :tooltip-position="!isProPaymentPlan ? 'top' : false"
              >
                <label class="switch" :class="{ disabled: !isProPaymentPlan }">
                  <input
                    type="checkbox"
                    v-model="feed.web_hook_enabled"
                    :disabled="!isProPaymentPlan"
                  />
                  <div class="slider round"></div>
                </label>
                <label>{{
                  $t("personalFeedForm.settings.l_web_hook_enabled")
                }}</label>
              </div>
            </div>
          </div>
        </div>

        <div
          class="row"
          v-if="feed.usage_type && feed.usage_type.label !== 'TELEGRAM'"
        >
          <div class="col-12">
            <div class="form-group">
              <label class="switch">
                <input type="checkbox" v-model="feed.moderate_subscriptions" />
                <div class="slider round"></div>
              </label>
              <label>{{
                $t("personalFeedForm.settings.l_moderate_subscribers")
              }}</label>
              <label
                :tooltip="$t('feedCreation.tt_moderate_subscribers')"
                tooltip-position="right"
              >
                <span class="fas fa-question-circle"></span>
              </label>
            </div>
          </div>
        </div>

        Simple, [10.12.2021 15:27]
        <div class="row" v-if="feed.usage_type.label == 'MANUAL'">
          <div class="col-12">
            <div class="form-group">
              <label class="switch">
                <input type="checkbox" v-model="feed.hide_proposals" />
                <div class="slider round"></div>
              </label>
              <label>{{
                $t("personalFeedForm.settings.l_hide_proposals")
              }}</label>
              <label
                :tooltip="$t('feedCreation.tt_hide_proposals')"
                tooltip-position="right"
              >
                <span class="fas fa-question-circle"></span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="row"
          v-if="feed.usage_type && feed.usage_type.label == 'TELEGRAM'"
        >
          <div class="col-12">
            <div class="form-group">
              <label class="switch" for="use_forwarded_messages">
                <input
                  type="checkbox"
                  id="use_forwarded_messages"
                  v-model="feed.use_forwarded_messages"
                />
                <div class="slider round"></div>
              </label>
              <label>{{
                $t("personalFeedForm.settings.l_use_forwarded_messages")
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="block-inner block-inner-with-bottom-line">
        <SelectBaseCurrenciesSection
          ref="SelectBaseCurrenciesSection"
          :exchanges.sync="exchanges"
          :feed.sync="feed"
          :BITMEX_AND_OTHERS_ERROR.sync="BITMEX_AND_OTHERS_ERROR"
          :BINANCE_MARGIN_AND_OTHERS_ERROR.sync="
            BINANCE_MARGIN_AND_OTHERS_ERROR
          "
          @changeBinanceAccountTypeIsFutures="
            changeBinanceAccountTypeIsFutures($event)
          "
          @update:feed="feed = $event"
          @update:all_selected_base_currencies_correct="
            all_selected_base_currencies_correct = $event
          "
        />
      </div>

      <div class="block-inner">
        <div class="feed-info-rows">
          <div class="feed-info-row">
            <div class="form-group">
              <label
                >{{ $t("feedCreation.l_telegram") }}
                <span class="main-color">*</span></label
              >
              <div class="input-container start-padding">
                <span class="start-symbol">@</span>
                <input
                  class="form-control custom-input"
                  type="text"
                  v-model="feed.description.telegram_account"
                />
              </div>
              <div class="bc-mini-tip">
                {{ $t("feedCreation.m_telegramTip") }}
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t("feedCreation.l_tradingViewLink") }}</label>
              <input
                class="form-control custom-input"
                type="text"
                v-model="feed.description.trading_view_link"
              />
              <div class="mini-error-tip" v-if="tv_link_isnt_correct">
                {{ $t("feedCreation.l_linkIsntCorrect") }}
              </div>
            </div>
          </div>

          Simple, [10.12.2021 15:27]
          <div class="feed-info-row">
            <div class="form-group">
              <label>{{ $t("feedCreation.l_monthPrice") }}, $</label>
              <div class="input-container">
                <input
                  class="form-control custom-input"
                  type="number"
                  v-model="feed.subscription_period_price"
                />
                <div
                  v-if="
                    +feed.subscription_period_price &&
                    !price_error &&
                    !priceMoreThanStartValue()
                  "
                  class="price-after-commission"
                >
                  <span class="first-value">
                    -
                    {{
                      (feed.subscription_period_price *
                        SUBSCRIPTION_PRICE_COMMISSION)
                        | toFixed(2)
                    }}$
                  </span>
                  <span class="second-value">
                    =
                    {{
                      (feed.subscription_period_price *
                        (1 - SUBSCRIPTION_PRICE_COMMISSION))
                        | toFixed(2)
                    }}$
                  </span>
                </div>
              </div>
              <div
                class="bc-mini-tip main-color"
                v-if="feed.subscription_period_price != 0"
              >
                {{
                  $t("feedCreation.m_priceCommission", {
                    value: SUBSCRIPTION_PRICE_COMMISSION * 100,
                  })
                }}
              </div>

              <!-- error price -->
              <!-- <div class="bc-mini-tip failed" v-if="(feed.usage_type && feed.usage_type.label == 'TELEGRAM') && feed.subscription_period_price == 0">{{ $t('personalFeedForm.l_enterSubscriptionPrice')}}</div> -->
              <div
                class="bc-mini-tip"
                v-if="feed.subscription_period_price == 0"
              >
                {{ $t("feedCreation.m_subscriptionFree") }}
              </div>

              Simple, [10.12.2021 15:27]
              <div v-if="price_error" class="mini-error-tip">
                {{
                  $t("feedCreation.m_priceShouldBe", {
                    from: settings.personal_feed_price_min,
                    to: settings.personal_feed_price_max,
                  })
                }}
              </div>
              <div class="bc-mini-tip failed" v-if="priceMoreThanStartValue()">
                {{ $t("feedCreation.m_cantBeMoreThan") }}
                {{ minimal_price_for_update }}$
                <span
                  :tooltip="$t('feedCreation.tt_changeLimitOnActiveFeed')"
                  tooltip-position="right"
                >
                  <div class="fas fa-question-circle"></div>
                </span>
              </div>
            </div>
            <div
              class="form-group"
              v-if="feed.usage_type && feed.usage_type.label != 'TELEGRAM'"
            >
              <label
                >{{ $t("feedCreation.l_fee") }}, %
                <span class="main-color">*</span></label
              >
              <input
                class="form-control custom-input"
                type="number"
                v-model="feed.fee"
              />
              <div class="bc-mini-tip main-color">
                <span>{{
                  $t("feedCreation.m_feeCommission2", {
                    value: FEE_COMMISSION * 100,
                  })
                }}</span>
              </div>
              <div v-if="fee_error" class="mini-error-tip">
                {{
                  $t("feedCreation.m_feeShouldBe", {
                    from: +settings.personal_feed_fee_min * 100,
                    to: +settings.personal_feed_fee_max * 100,
                  })
                }}
              </div>
              <div class="bc-mini-tip failed" v-if="feeMoreThanStartValue()">
                {{ $t("feedCreation.m_cantBeMoreThan") }}
                {{ minimal_fee_for_update }}%
                <span
                  :tooltip="$t('feedCreation.tt_changeLimitOnActiveFeed')"
                  tooltip-position="right"
                >
                  <div class="fas fa-question-circle"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="block-inner"
        v-if="
          (feed.usage_type && feed.usage_type.label == 'TELEGRAM') ||
          (feed.web_hook_enabled && feed.usage_type.label !== 'ROBOT')
        "
      >
        <div class="row">
          <div class="col-md-5 col-12 feed-settings-container">
            <div
              class="form-group"
              v-if="
                !(feed.usage_type.label == 'MANUAL' && feed.web_hook_enabled)
              "
            >
              <label class="switch" for="default_settings_active">
                <input
                  type="checkbox"
                  id="default_settings_active"
                  v-model="feed.default_settings_active"
                />
                <div class="slider round"></div>
              </label>
              <label
                >{{ $t("personalFeedForm.settings.default_settings_active") }}

                Simple, [10.12.2021 15:27]
                <span class="fas fa-question-circle"></span>
                <span class="tooltips-container">
                  <span
                    :tooltip="
                      $t('marketPlaceSubscribeModal.ttp_standart_settings')
                    "
                    tooltip-position="right"
                  ></span>
                </span>
              </label>
            </div>
            <div
              class="feed-settings"
              v-if="
                feed.default_settings_active ||
                (feed.usage_type.label == 'MANUAL' && feed.web_hook_enabled)
              "
            >
              <!-- new type feed settings -->
              <div class="feed-settings-type-label no-border">
                {{ $t("personalFeedForm.settings.main_settings") }}
              </div>
              <div
                class="form-group"
                v-if="
                  feed.usage_type.label == 'TELEGRAM' ||
                  !(feed.web_hook_enabled && feed.usage_type.label == 'MANUAL')
                "
              >
                <label
                  >{{ $t("personalFeedForm.settings.minimal_limit") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_limit_per_task')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  onkeypress="return window.positive(event.charCode)"
                  class="form-control custom-input"
                  v-model="feed.minimal_limit"
                />
              </div>
              <div
                class="form-group"
                v-if="
                  feed.usage_type.label == 'TELEGRAM' ||
                  !(feed.web_hook_enabled && feed.usage_type.label == 'MANUAL')
                "
              >
                <label class="switch" for="use_max_tasks">
                  <input
                    type="checkbox"
                    id="use_max_tasks"
                    v-model="feed.use_max_tasks"
                  />
                  <div class="slider round"></div>
                </label>
                <label>{{
                  $t("personalFeedForm.settings.use_max_tasks")
                }}</label>
              </div>
              <div class="form-group" v-if="feed.use_max_tasks">
                <label>{{ $t("personalFeedForm.settings.max_tasks") }}</label>
                <input
                  type="number"
                  min="0"
                  onkeypress="return window.positiveAndRound(event.charCode)"
                  class="form-control custom-input"
                  v-model="feed.max_tasks"
                />
              </div>
              <div class="form-group">
                <label>{{
                  $t("personalFeedForm.settings.limit_per_task")
                }}</label>
                <div class="input-container">
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.limit_per_task"
                  />
                  <div
                    v-if="feed.limit_per_task && feed.minimal_limit"
                    class="input-abs-value"
                  >
                    <span
                      class="single-value"
                      v-bind:class="{ failed: feed.limit_per_task > 100 }"
                      >{{
                        ((feed.limit_per_task / 100) * feed.minimal_limit)
                          | toFixed(6)
                      }}
                      BTC</span
                    >
                  </div>
                </div>
                <div
                  Simple,
                  [10.12.2021
                  15:27]
                  class="mini-tip-input"
                  v-bind:class="{
                    failed:
                      (feed.limit_per_task / 100) * feed.minimal_limit <
                      0.00015,
                  }"
                >
                  {{ $t("personalFeedForm.warnings.limitShouldBeGreater") }}
                </div>
              </div>
              <div class="form-group">
                <label class="switch" for="buy_limit_order">
                  <input
                    type="checkbox"
                    id="buy_limit_order"
                    v-model="feed.buy_limit_order"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.buy_limit_order") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_use_limit_buy_orders')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>
              <div
                class="form-group"
                v-if="
                  !(feed.usage_type.label == 'MANUAL' && feed.web_hook_enabled)
                "
              >
                <label class="switch" for="single_task_per_symbol">
                  <input
                    type="checkbox"
                    id="single_task_per_symbol"
                    v-model="feed.single_task_per_symbol"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.single_task_per_symbol") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_one_pair_one_task')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>

              <div
                class="form-group"
                v-if="
                  feed.usage_type.label !== 'ROBOT' && feed.web_hook_enabled
                "
              >
                <label class="switch">
                  <input
                    type="checkbox"
                    id="web_hook_single_signal_per_symbol"
                    v-model="feed.web_hook_single_signal_per_symbol"
                  />
                  <div class="slider round"></div>
                </label>

                <label
                  >{{
                    $t(
                      "personalFeedForm.settings.single_task_per_symbol_webhook"
                    )
                  }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_one_pair_one_task')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>

              <div class="form-group">
                <label class="switch" for="use_tasks_ttl">
                  <input
                    type="checkbox"
                    id="use_tasks_ttl"
                    v-model="feed.use_tasks_ttl"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.use_tasks_ttl") }}

                  Simple, [10.12.2021 15:27]
                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_task_lifetime')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>
              <div class="form-group" v-if="feed.use_tasks_ttl">
                <label>{{
                  $t("personalFeedForm.settings.task_days_to_live")
                }}</label>
                <input
                  type="number"
                  min="0"
                  onkeypress="return window.positiveAndRound(event.charCode)"
                  class="form-control custom-input"
                  v-model="feed.task_days_to_live"
                />
              </div>

              <div
                class="form-group"
                v-if="is_bitmex_selected || binanceAccountTypeIsFutures"
              >
                <label class="switch" for="use_leverage">
                  <input
                    type="checkbox"
                    id="use_leverage"
                    v-model="feed.use_leverage"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.l_use_leverage") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_l_use_leverage')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>

              <div class="form-group" v-if="feed.use_leverage">
                <label>{{ $t("personalFeedForm.settings.l_leverage") }}</label>
                <input
                  type="number"
                  min="0"
                  onkeypress="return window.positiveAndRound(event.charCode)"
                  class="form-control custom-input"
                  v-model="feed.leverage"
                />
              </div>

              <div class="form-group">
                <label class="switch" for="wait_buy_for_sell">
                  <input
                    type="checkbox"
                    id="wait_buy_for_sell"
                    v-model="feed.wait_buy_for_sell"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.l_wait_buy_for_sell") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_wait_buy_for_sell')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>

              <div class="feed-settings-type-label">
                {{ $t("personalFeedForm.settings.averaging_settings") }}
              </div>
              <div class="form-group">
                <label class="switch" for="use_averaging">
                  <input
                    type="checkbox"
                    id="use_averaging"
                    v-model="feed.use_averaging"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.use_averaging") }}

                  Simple, [10.12.2021 15:27]
                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_use_averaging')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>
              <div v-if="feed.use_averaging">
                <div
                  class="form-group"
                  v-if="
                    feed.usage_type.label == 'TELEGRAM' ||
                    !(
                      feed.web_hook_enabled && feed.usage_type.label == 'MANUAL'
                    )
                  "
                >
                  <label
                    >{{ $t("personalFeedForm.settings.max_averaging") }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_max_averaging_amount'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positiveAndRound(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.max_averaging"
                  />
                  <div class="mini-tip-input">
                    {{
                      $t("personalFeedForm.warnings.averagingRecommendation")
                    }}
                  </div>
                </div>
                <div
                  class="form-group"
                  v-if="
                    feed.usage_type.label == 'TELEGRAM' ||
                    !(
                      feed.web_hook_enabled && feed.usage_type.label == 'MANUAL'
                    )
                  "
                >
                  <label
                    >{{ $t("personalFeedForm.settings.averaging_threshold") }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t('marketPlaceSubscribeModal.ttp_price_falling')
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.averaging_threshold"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{ failed: feed.averaging_threshold < 0 }"
                  >
                    {{ $t("personalFeedForm.warnings.averagingPriceLoss") }}
                  </div>
                </div>
                <div class="form-group">
                  <label
                    >{{ $t("personalFeedForm.settings.averaging_amount") }}

                    Simple, [10.12.2021 15:27]
                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t('marketPlaceSubscribeModal.ttp_averaging_amount')
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.averaging_amount"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{
                      failed:
                        feed.averaging_amount < 0 ||
                        feed.averaging_amount > 100,
                    }"
                  >
                    {{ $t("personalFeedForm.warnings.averagingAmountRec") }}
                  </div>
                </div>
                <div class="form-group">
                  <label
                    >{{
                      $t("personalFeedForm.settings.averaging_amount_factor")
                    }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_averaging_amount_factor'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.averaging_amount_factor"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{
                      failed:
                        feed.averaging_amount_factor < 0 ||
                        feed.averaging_amount_factor > 5,
                    }"
                  >
                    {{ $t("personalFeedForm.settings.averaging_factor_tip") }}
                  </div>
                </div>
                <div
                  class="form-group"
                  v-if="
                    feed.usage_type.label == 'TELEGRAM' ||
                    !(
                      feed.web_hook_enabled && feed.usage_type.label == 'MANUAL'
                    )
                  "
                >
                  <label
                    >{{
                      $t("personalFeedForm.settings.averaging_threshold_factor")
                    }}

                    Simple, [10.12.2021 15:27]
                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_averaging_threshold_factor'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.averaging_threshold_factor"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{
                      failed:
                        feed.averaging_threshold_factor < 0 ||
                        feed.averaging_threshold_factor > 5,
                    }"
                  >
                    {{ $t("personalFeedForm.settings.averaging_factor_tip") }}
                  </div>
                </div>
                <div class="form-group">
                  <label class="switch" for="averaging_take_profit_correction">
                    <input
                      type="checkbox"
                      id="averaging_take_profit_correction"
                      v-model="feed.averaging_take_profit_correction"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t(
                        "personalFeedForm.settings.averaging_take_profit_correction"
                      )
                    }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_averaging_take_profit_correction'
                          )
                        "
                        tooltip-position="bottom"
                      ></span>
                    </span>
                  </label>
                </div>
                <div class="form-group">
                  <label class="switch" for="averaging_buy_limit_order">
                    <input
                      type="checkbox"
                      id="averaging_buy_limit_order"
                      v-model="feed.averaging_buy_limit_order"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t("personalFeedForm.settings.averaging_buy_limit_order")
                    }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_use_limit_buy_orders_for_averaging'
                          )
                        "
                        tooltip-position="bottom"
                      ></span>
                    </span>
                  </label>
                </div>

                Simple, [10.12.2021 15:27]
                <div class="form-group">
                  <label class="switch" for="proportional_take_profits">
                    <input
                      type="checkbox"
                      id="proportional_take_profits"
                      v-model="feed.proportional_take_profits"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t("personalFeedForm.settings.use_propostional_trade")
                    }}
                  </label>
                </div>
              </div>
              <!-- take profits -->
              <!-- meta -->
              <div class="feed-settings-type-label">
                {{ $t("personalFeedForm.settings.take_profit_settings") }}
              </div>
              <div class="form-group">
                <div>
                  <label>{{
                    $t("personalFeedForm.settings.take_profits_count")
                  }}</label>
                  <div class="tps-buttons">
                    <button
                      @click="feed.take_profits_count = 1"
                      v-bind:class="{ selected: feed.take_profits_count == 1 }"
                      class="tp-btn"
                    >
                      1
                    </button>
                    <button
                      @click="feed.take_profits_count = 2"
                      v-bind:class="{ selected: feed.take_profits_count == 2 }"
                      class="tp-btn"
                    >
                      2
                    </button>
                    <button
                      @click="feed.take_profits_count = 3"
                      v-bind:class="{ selected: feed.take_profits_count == 3 }"
                      class="tp-btn"
                    >
                      3
                    </button>
                    <button
                      @click="feed.take_profits_count = 4"
                      v-bind:class="{ selected: feed.take_profits_count == 4 }"
                      class="tp-btn"
                    >
                      4
                    </button>
                    <button
                      @click="feed.take_profits_count = 5"
                      v-bind:class="{ selected: feed.take_profits_count == 5 }"
                      class="tp-btn"
                    >
                      5
                    </button>
                  </div>
                  <!-- <input min="1" max="5" type="number" class="form-control" pattern="[1-5]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="feed.take_profits_count"> -->
                </div>
                <div class="take-profits-group">
                  <div
                    v-for="(tp, index) in feed.take_profits"
                    v-show="index < feed.take_profits_count"
                  >
                    <div class="row">
                      <div class="col-2">
                        <span class="take-numbers"
                          >{{ index + 1 }}
                          <span class="mini">{{
                            $t("personalFeedForm.settings.take")
                          }}</span></span
                        >
                      </div>
                      <div class="col-5">
                        <div class="form-group">
                          <label>{{
                            $t("personalFeedForm.settings.tp_amount")
                          }}</label>
                          <input
                            type="number"
                            onkeypress="return window.positive(event.charCode)"
                            class="form-control custom-input"
                            v-model="tp.amount"
                          />
                        </div>
                      </div>
                      <div class="col-5">
                        <div class="form-group">
                          <label>{{
                            $t("personalFeedForm.settings.tp_threshold")
                          }}</label>
                          <input
                            type="number"
                            onkeypress="return window.positive(event.charCode)"
                            class="form-control custom-input"
                            v-model="tp.threshold_value"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="mini-tip-input"
                    v-bind:class="{ failed: summary_tps_amount != 100 }"
                  >
                    {{
                      $t(
                        "personalFeedForm.warnings.takeProfitAmountsShouldBe100"
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="switch" id="use_tp_limit_orders">
                  <div
                    :class="{
                      disabled:
                        take_profit_selector === 'limit' ||
                        take_profit_selector === 'stop_order',
                    }"
                  >
                    <input
                      type="checkbox"
                      :disabled="
                        take_profit_selector === 'limit' ||
                        take_profit_selector === 'stop_order'
                      "
                      v-model="feed.use_tp_limit_orders"
                    />
                    <div class="slider round"></div>
                  </div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.use_tp_limit_orders") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t(
                          'marketPlaceSubscribeModal.ttp_use_limit_buy_orders_for_averaging'
                        )
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
              </div>
              <div class="form-group">
                <label class="switch" for="use_tp_trailing">
                  <input
                    type="checkbox"
                    id="use_tp_trailing"
                    v-model="feed.use_tp_trailing"
                  />
                  <div class="slider round"></div>
                </label>
                <label
                  >{{ $t("personalFeedForm.settings.use_tp_trailing") }}

                  <span class="fas fa-question-circle"></span>
                  <span class="tooltips-container">
                    <span
                      :tooltip="
                        $t('marketPlaceSubscribeModal.ttp_use_trailing')
                      "
                      tooltip-position="right"
                    ></span>
                  </span>
                </label>
                <div v-if="feed.use_tp_trailing">
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="feed.tp_trailing_value"
                    onkeypress="return window.positive(event.charCode)"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{
                      failed:
                        feed.tp_trailing_value > 100 ||
                        feed.tp_trailing_value < 0.5,
                    }"
                  >
                    {{ $t("personalFeedForm.warnings.tpTrailingRecValue") }}
                  </div>
                </div>
              </div>

              <label>Тип ордеров: </label>

              Simple, [10.12.2021 15:27]
              <div class="take-profit-selector">
                <span
                  v-bind:tooltip="$t('smartTrade.tt_limit_order')"
                  tooltip-position="bottom"
                >
                  <span
                    @click="take_profit_selector = 'limit'"
                    class="mls-item"
                    v-bind:class="{
                      selected: take_profit_selector === 'limit',
                    }"
                    >{{ $t("smartTrade.l_togglerLimitType") }}</span
                  >
                </span>

                <span
                  :tooltip="
                    stop_loss_selector === 'stop_order'
                      ? $t(
                          'smartTrade.tt_binance_not_supports_duplicate_stop_orders'
                        )
                      : $t('smartTrade.tt_stop_loss_order')
                  "
                  tooltip-position="bottom"
                >
                  <span
                    @click="take_profit_selector = 'stop_order'"
                    class="mls-item"
                    v-bind:class="[
                      { selected: take_profit_selector === 'stop_order' },
                      { disabled: stop_loss_selector === 'stop_order' },
                    ]"
                  >
                    {{ $t("smartTrade.l_togglerStopOrderType") }}
                  </span>
                </span>

                <span
                  v-bind:tooltip="$t('smartTrade.tt_hidden_order')"
                  tooltip-position="bottom"
                >
                  <span
                    @click="take_profit_selector = 'hidden'"
                    class="mls-item"
                    v-bind:class="{
                      selected: take_profit_selector === 'hidden',
                    }"
                    >{{ $t("smartTrade.l_togglerHiddenType") }}</span
                  >
                </span>
              </div>

              <!-- stop loss -->
              <div class="feed-settings-type-label">
                {{ $t("personalFeedForm.settings.stop_loss_settings") }}
              </div>
              <div class="form-group">
                <label class="switch" for="use_stop_loss">
                  <input
                    type="checkbox"
                    id="use_stop_loss"
                    v-model="feed.use_stop_loss"
                  />
                  <div class="slider round"></div>
                </label>
                <label>{{
                  $t("personalFeedForm.settings.use_stop_loss")
                }}</label>
              </div>
              <div class="stop-loss-settings" v-if="feed.use_stop_loss">
                <div class="form-group">
                  <label>{{
                    $t("personalFeedForm.settings.stop_loss_threshold")
                  }}</label>
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="feed.stop_loss.threshold_value"
                    onkeypress="return window.positive(event.charCode)"
                  />
                  <div
                    class="mini-tip-input"
                    v-bind:class="{
                      failed:
                        feed.stop_loss.threshold_value < 0 ||
                        feed.stop_loss.threshold_value > 100,
                    }"
                  >
                    {{ $t("personalFeedForm.warnings.stopLossValue") }}
                  </div>
                </div>
                <div class="form-group">
                  <label class="switch" for="use_stop_loss_trailing">
                    <input
                      type="checkbox"
                      id="use_stop_loss_trailing"
                      v-model="feed.stop_loss.trailing"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t("personalFeedForm.settings.use_stop_loss_trailing")
                    }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_use_stoploss_trailing'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>
                <div class="form-group">
                  <label class="switch" id="use_stop_loss_limit_orders">
                    <div
                      :class="{ disabled: stop_loss_selector === 'stop_order' }"
                    >
                      <input
                        type="checkbox"
                        :disabled="stop_loss_selector === 'stop_order'"
                        v-model="feed.use_stop_loss_limit_orders"
                      />
                      <div class="slider round"></div>
                    </div>
                  </label>
                  <label
                    >{{
                      $t("personalFeedForm.settings.use_stop_loss_limit_orders")
                    }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_use_limit_buy_orders_for_averaging'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>
                <div class="form-group">
                  <label class="switch" for="use_stop_loss_ladder">
                    <input
                      type="checkbox"
                      id="use_stop_loss_ladder"
                      v-model="feed.stop_loss.ladder"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{ $t("personalFeedForm.settings.use_stop_loss_ladder") }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_use_stop_loss_ladder'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>

                <label>Тип ордеров: </label>

                <div class="stop-loss-selector">
                  <span
                    :tooltip="getStopLossTooltipText()"
                    tooltip-position="bottom"
                  >
                    <span
                      @click="stop_loss_selector = 'stop_order'"
                      class="mls-item"
                      v-bind:class="[
                        { selected: stop_loss_selector === 'stop_order' },
                        {
                          disabled:
                            take_profit_selector === 'limit' ||
                            take_profit_selector === 'stop_order',
                        },
                      ]"
                    >
                      {{ $t("smartTrade.l_togglerStopOrderType") }}
                    </span>
                  </span>

                  Simple, [10.12.2021 15:27]
                  <span
                    v-bind:tooltip="$t('smartTrade.tt_hidden_order')"
                    tooltip-position="bottom"
                  >
                    <span
                      @click="stop_loss_selector = 'hidden'"
                      class="mls-item"
                      v-bind:class="{
                        selected: stop_loss_selector === 'hidden',
                      }"
                      >{{ $t("smartTrade.l_togglerHiddenType") }}</span
                    >
                  </span>
                </div>

                <div v-show="number_of_pages_settings < 3" class="form-group">
                  <label class="switch" for=" set_parameters_for_each_pair">
                    <input
                      type="checkbox"
                      id=" set_parameters_for_each_pair"
                      v-model="set_parameters"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t(
                        "personalFeedForm.settings.set_parameters_for_each_pair"
                      )
                    }}
                  </label>
                </div>
                <div
                  v-show="set_parameters"
                  class="set_parameters form-group use-mini-multiselect"
                >
                  <multiselect
                    class="tasks-custom-multiselect"
                    v-model="pairs"
                    :options="currency_pairs"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    :multiple="true"
                    track-by="currency"
                    label="name"
                  >
                    <template slot="caret" slot-scope="{ option }">
                      <span class="multiselect__caret">
                        <span class="ifont icon-shevron-right"></span>
                      </span>
                    </template>
                    <template slot="placeholder" slot-scope="{ option }">
                      <span class="custom-placeholder">{{
                        $t("personalFeedForm.settings.selected_pairs")
                      }}</span>
                    </template>
                    <template
                      slot="tag"
                      slot-scope="{ option, search, remove }"
                    >
                      <span
                        class="
                          multiselect__tag multiselect-custom-tag
                          d-flex
                          align-items-center
                        "
                      >
                        <img
                          class="coin-image"
                          v-bind:src="coinImageSrc(option.currency)"
                        />
                        <span>{{ option.base_currency }}/</span>
                        <span>{{ option.currency }}</span>
                        <span v-if="feed.exchanges.length > 1">
                          ({{ option.name }})
                        </span>
                        <span
                          class="close-button ifont icon-times"
                          @click="remove(option)"
                        ></span>
                      </span>
                    </template>
                    <template slot="option" slot-scope="{ option, search }">
                      <span
                        >{{ option.base_currency }}/{{ option.currency }}</span
                      >
                      <span v-if="feed.exchanges.length > 1">
                        ({{ option.name }})
                      </span>
                    </template>
                  </multiselect>
                </div>
              </div>

              <div
                class="block-setting"
                v-for="(item, inx) in setting_list"
                :key="inx"
              >
                <SpecifyIndividualSettings
                  v-if="item.show"
                  @showBlock="showBlock($event, inx)"
                  :showCheckbox="inx == setting_list.length - 1 ? false : true"
                  :inxBlock="inx"
                  :count_page="count_page"
                />
              </div>

              Simple, [10.12.2021 15:27]
              <div
                v-if="
                  feed.usage_type.label == 'TELEGRAM' ||
                  !(feed.web_hook_enabled && feed.usage_type.label == 'MANUAL')
                "
              >
                <div class="feed-settings-type-label">
                  {{ $t("personalFeedForm.settings.filtering_settings") }}
                </div>
                <div class="form-group">
                  <label class="switch" for="filter_by_price">
                    <input
                      type="checkbox"
                      id="filter_by_price"
                      v-model="feed.use_filter_by_price"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{ $t("personalFeedForm.settings.filter_by_price") }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t('marketPlaceSubscribeModal.ttp_filter_by_price')
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>
                <div class="form-group" v-if="feed.use_filter_by_price">
                  <label>{{ $t("personalFeedForm.settings.min_price") }}</label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.min_price"
                  />
                </div>
                <div class="form-group">
                  <label class="switch" for="filter_by_volume">
                    <input
                      type="checkbox"
                      id="filter_by_volume"
                      v-model="feed.use_filter_by_volume"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{ $t("personalFeedForm.settings.filter_by_volume") }}

                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t('marketPlaceSubscribeModal.ttp_filter_by_volume')
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>
                <div class="form-group" v-if="feed.use_filter_by_volume">
                  <label>{{
                    $t("personalFeedForm.settings.min_volume")
                  }}</label>
                  <input
                    type="number"
                    min="0"
                    onkeypress="return window.positive(event.charCode)"
                    class="form-control custom-input"
                    v-model="feed.min_volume"
                  />
                </div>
                <div class="form-group">
                  <label class="switch" for="quote_currency_whitelist">
                    <input
                      type="checkbox"
                      id="quote_currency_whitelist"
                      v-model="feed.use_quote_currency_whitelist"
                    />
                    <div class="slider round"></div>
                  </label>
                  <label
                    >{{
                      $t(
                        "personalFeedForm.settings.use_quote_currency_whitelist"
                      )
                    }}

                    Simple, [10.12.2021 15:27]
                    <span class="fas fa-question-circle"></span>
                    <span class="tooltips-container">
                      <span
                        :tooltip="
                          $t(
                            'marketPlaceSubscribeModal.ttp_use_quote_currency_whitelist'
                          )
                        "
                        tooltip-position="right"
                      ></span>
                    </span>
                  </label>
                </div>

                <div
                  class="form-group use-mini-multiselect"
                  v-if="feed.use_quote_currency_whitelist && quote_currencies"
                >
                  <label>{{
                    $t("personalFeedForm.settings.quote_currency_whitelist")
                  }}</label>
                  <multiselect
                    class="tasks-custom-multiselect"
                    v-model="feed.quote_currency_whitelist"
                    :options="quote_currencies"
                    :searchable="true"
                    :close-on-select="false"
                    :show-labels="false"
                    :multiple="true"
                  >
                    <template slot="caret" slot-scope="{ option }">
                      <span class="multiselect__caret">
                        <span class="ifont icon-shevron-right"></span>
                      </span>
                    </template>
                    <template slot="placeholder" slot-scope="{ option }">
                      <span class="custom-placeholder">{{
                        $t("personalFeedForm.settings.quote_currency_whitelist")
                      }}</span>
                    </template>
                    <template
                      slot="tag"
                      slot-scope="{ option, search, remove }"
                    >
                      <span class="multiselect__tag multiselect-custom-tag">
                        <span class="exchange-image">
                          <img
                            class="coin-image"
                            v-bind:src="coinImageSrc(option)"
                          />
                        </span>
                        <span class="exchange-name">{{ option }}</span>
                        <span
                          class="close-button ifont icon-times"
                          @click="remove(option)"
                        ></span>
                      </span>
                    </template>
                    <template slot="option" slot-scope="{ option }">
                      <span class="exchange-image">
                        <img
                          class="coin-image"
                          v-bind:src="coinImageSrc(option)"
                        />
                      </span>
                      {{ option }}
                    </template>
                  </multiselect>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7 col-12">
            <div class="form-group">
              <label>{{ $t("feedCreation.l_fullDescription") }}</label>
              <wysiwyg v-model="feed.description.full_description" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="buttons-bottom-panel clearfix">
      <button
        v-bind:disabled="creation_disabled"
        class="btn btn-tm btn-tm-big fl"
        @click="createFeed"
      >
        <span v-if="feed.id">{{ $t("personalFeedForm.l_UpdateFeed") }}</span>
        <span v-else>{{ $t("personalFeedForm.l_CreateFeed") }}</span>
      </button>

      Simple, [10.12.2021 15:27]
      <button
        v-if="feed.id && feed.status == 'INACTIVE'"
        @click="openFeedRemoveModal()"
        class="btn btn-tm btn-tm-big btn-tm-red fr"
      >
        {{ $t("personalFeedForm.l_RemoveFeed") }}
      </button>
    </div>
  </div>
</template>
<script>
import connectors from "../../connectors";
import _ from "lodash";
import moment from "moment";
import toFixed from "../../filters/toFixed";
import { BUS } from "../../main";
import messagesController from "../widgets/MessagesController";
import SelectBaseCurrenciesSection from "./SelectBaseCurrenciesSection/SelectBaseCurrenciesSection";
import SpecifyIndividualSettings from "./SpecifyIndividualSettings/SpecifyIndividualSettings";

export default {
  name: "PersonalFeedForm",
  data() {
    return {
      count_page: 0,
      setting_list:[
       {show: false},
       {show: false},
       {show: false},
       {show: false}
      ],
      number_of_pages_settings: 0,
      settings_coin: [],
      set_parameters: false,
      currency_pairs: [],
      pairs: null,
      user: null,
      is_binance_margin: false,
      settings: {},
      feed: {
        name: "", // название канала
        description: {
          // описание канала и стиля торговли, может быть произвольным json
          text: "", //OPTIONAL вводные слова сигналмейкера о своем канале
          average_per_task_amount: 10, //среднее количество денег от minimal_limit на одну задачу (число от 0.0 до 1.0)
          average_take_profits_amount: 5, //среднее количество тейк профитов на задачу
          average_stop_loss_level: 5, //средний относительный уровень стоп лосса от уровня покупки
          trade_style: "SHORT_TERM", //'SHORT_TERM' || 'LONG_TERM' краткосрок или долгосрок (оценка исполнения сигнала по времени)
        },
        usage_type: "MANUAL", //'MANUAL' || 'ROBOT'
        subscription_period_price: 0,
        fee: 10, //число от 0 до 1, обозначает плату сигналмейкеру в процентах от профита за положительный профит закрытой автоматической задачи - его баунти.
        exchanges: [], //список бирж в виде exchange_ids, на которых сигналмейкер будет создавать сигналы
        base_currencies: {},
        leverage: 1,
        take_profits: [{}, {}, {}, {}, {}],
        stop_loss: {},
        web_hook_enabled: false,
        web_hook_enabled1: false,
        moderate_subscriptions: false,
        hide_proposals: false,
        wait_buy_for_sell: false,
        proportional_take_profits: false,
        tp_trailing_value: 2,
        use_tp_limit_orders: null,
        use_stop_loss_limit_orders: null,
        use_leverage: false,
        recommended_settings: false,
        use_earned_recommended: false,
        max_drawdown: false,
        maximum_drawdown_amount: 0,
        drawdown_active_tasks_recommended: false,
        set_recommended_for_each_currency: false,
      },
      feed_default_settings: {
        default_settings_active: true,
        minimal_limit: 0.5,
        use_max_tasks: false,
        max_tasks: 200,
        limit_per_task: 5,
        min_price: 0.000001,
        buy_limit_order: true,
        single_task_per_symbol: true,
        web_hook_single_signal_per_symbol: false,
        task_days_to_live: 3,
        max_averaging: 3,
        min_volume: 20,
        averaging_threshold: 2,
        averaging_amount: 50,
        // averaging_amount_incremental : true,
        wait_buy_for_sell: false,
        proportional_take_profits: false,
        tp_trailing_value: 2,
        use_tp_limit_orders: null,
        use_stop_loss_limit_orders: null,
        averaging_amount_factor: 1,
        averaging_threshold_factor: 1,
        averaging_take_profit_correction: true,
        averaging_buy_limit_order: false,
        use_tasks_ttl: false,
        use_stop_loss: true,
        stop_loss: {
          threshold_value: 5,
          trailing: true,
          ladder: true,
        },
        take_profits_count: 1,
        use_tp_trailing: true,
        take_profits: [
          {
            amount: 100,
            threshold_value: 5,
          },
          {},
          {},

Simple, [10.12.2021 15:27]
{},
          {},
        ],
      },
      feed_types: [
        { label: "MANUAL" },
        { label: "ROBOT" },
        { label: "TELEGRAM" },
      ],
      trade_styles: [
        { label: "SHORT_TERM" },
        { label: "MIDDLE_TERM" },
        { label: "LONG_TERM" },
      ],
      minimal_fee_for_update: null,
      minimal_price_for_update: null,
      image_loading: false,
      take_profit_selector: null,
      stop_loss_selector: null,
      all_selected_base_currencies_correct: true,
      binanceAccountTypeIsFutures: null,
    };
  },
  components: {
    SpecifyIndividualSettings,
    SelectBaseCurrenciesSection
  },
  watch: {
    set_parameters(v){
      this.showBlock(v, 0)
        
    },
     "feed.exchanges"(v){
       let arr_pairs = []
       
       v.forEach(el => {
         for (const key in el.currency_pairs) {
            el.currency_pairs[key].name = el.type
           arr_pairs.push(el.currency_pairs[key])
         }
       })
       this.currency_pairs = arr_pairs
     },
    "feed.web_hook_enabled"(value) {
      if (value === true) {
        if (!this.feed.take_profits) {
          for (let sett in this.feed_default_settings) {
            if (!this.feed[sett]) {
              this.$set(this.feed, sett, this.feed_default_settings[sett]);
            }
          }
        }
      }
    },
    take_profit_selector(value) {
      let elem = $("#use_tp_limit_orders");

      if (value === "limit" || value === "stop_order") {
        this.stop_loss_selector = "hidden";
        this.feed.use_tp_limit_orders = true;

        elem.attr(
          "tooltip",
          this.$t("feedCreation.tt_notMarketOrdersSupported")
        );
        elem.attr("tooltip-position", "top");
      } else if (value === "hidden") {
        elem.removeAttr("tooltip");
        elem.removeAttr("tooltip-position");
      }

      this.fillOrdersFields("tp");
    },
    stop_loss_selector(value) {
      let elem = $("#use_stop_loss_limit_orders");

      if (value === "stop_order") {
        this.take_profit_selector = "hidden";
        this.feed.use_stop_loss_limit_orders = true;

        elem.attr(
          "tooltip",
          this.$t("feedCreation.tt_notMarketOrdersSupported")
        );
        elem.attr("tooltip-position", "top");
      } else if (value === "hidden") {
        elem.removeAttr("tooltip");
        elem.removeAttr("tooltip-position");
      }
      this.fillOrdersFields("sl");
    },
    is_binance_margin: {
      handler(val) {
        this.feed.exchanges = this.feed.exchanges.map((el) => {
          if (el.name.match("Binance")) {
            el.binance_margin = val;
          }
          return el;
        });
      },
    },
  },
  computed: {
    isProPaymentPlan() {
      if (!this.user) return;

      return (
        this.user.payment_plan_type === "PRO" && this.user.payment_plan_paid
      );
    },
    is_bitmex_selected() {
      let value =
        this.feed.exchanges.filter((el) => el.name.startsWith("BitMEX"))
          .length > 0 && !this.BITMEX_AND_OTHERS_ERROR;

      value = value || this.feed.futures;

Simple, [10.12.2021 15:32]
if (!value) {
        this.feed.leverage = 1;
      }
      return value;
    },
    quote_currencies() {
      let c = _.uniq(
        _.flatten(
          this.feed.exchanges.map((el) =>
            el.currency_pairs.map((el) => el.currency)
          )
        )
      );
      return c;
    },
    SUBSCRIPTION_PRICE_COMMISSION() {
      if (
        this.feed &&
        this.feed.usage_type &&
        this.feed.usage_type.label == "MANUAL"
      ) {
        return (
          +this.settings.personal_feed_manual_price_commission ||
          +this.settings.feed_subscription_period_service_fee
        );
      }
      if (
        this.feed &&
        this.feed.usage_type &&
        this.feed.usage_type.label == "ROBOT"
      ) {
        return (
          +this.settings.personal_feed_robot_price_commission ||
          +this.settings.feed_subscription_period_service_fee
        );
      }
      if (
        this.feed &&
        this.feed.usage_type &&
        this.feed.usage_type.label == "TELEGRAM"
      ) {
        return (
          +this.settings.personal_feed_manual_price_commission ||
          +this.settings.feed_subscription_period_service_fee
        );
      }
    },
    FEE_COMMISSION() {
      // Для новых фидов почему-то надо ставить дефолт 10%, хотя settings у нас уже есть. CR-1759 пункт 1...
      if (!this.feed.id) {
        return 0.1;
      }
      if (
        this.feed &&
        this.feed.usage_type &&
        this.feed.usage_type.label == "MANUAL"
      ) {
        return (
          +this.feed.manual_fee_commission ||
          +this.settings.personal_feed_manual_fee_commission ||
          +this.settings.personal_feed_commission
        );
      }
      if (
        this.feed &&
        this.feed.usage_type &&
        this.feed.usage_type.label == "ROBOT"
      ) {
        return (
          +this.feed.robot_fee_commission ||
          +this.settings.personal_feed_robot_fee_commission ||
          +this.settings.personal_feed_commission
        );
      }
    },
    BITMEX_AND_OTHERS_ERROR() {
      if (!this.feed.exchanges.length) return;
      let has_bitmex = !!this.feed.exchanges.filter((el) =>
        el.name.startsWith("BitMEX")
      ).length;
      let not_has_bitmex = !!this.feed.exchanges.filter(
        (el) => !el.name.startsWith("BitMEX")
      ).length;
      if (has_bitmex && not_has_bitmex) return true;
    },
    BINANCE_MARGIN_AND_OTHERS_ERROR() {
      let has_bitmex =
        !!this.feed.exchanges.filter((el) => el.name.startsWith("Binance"))
          .length && this.is_binance_margin;
      let not_has_bitmex = !!this.feed.exchanges.filter(
        (el) => !el.name.startsWith("Binance")
      ).length;
      if (has_bitmex && not_has_bitmex) return true;
    },
    disabled_to_update() {
      return this.feed.status == "ACTIVE";
    },
    fee_error() {
      return (
        this.feed.fee == undefined ||
        this.feed.fee < +this.settings.personal_feed_fee_min * 100 ||
        this.feed.fee > +this.settings.personal_feed_fee_max * 100
      );
    },
    price_error() {
      if (this.feed.subscription_period_price == 0) return false;
      return (
        this.feed.subscription_period_price == undefined ||
        this.feed.subscription_period_price <
          +this.settings.personal_feed_price_min ||
        this.feed.subscription_period_price >
          +this.settings.personal_feed_price_max
      );
    },
    tv_link_isnt_correct() {
      if (!this.feed.description.trading_view_link) return false;
      return !this.feed.description.trading_view_link.match(/tradingview/gi);
    },
    summary_tps_amount() {
      let v = this.feed.take_profits
        ? this.feed.take_profits
            .slice(0, this.feed.take_profits_count)
            .map((el) => +el.amount)
            .filter((el) => el)
            .reduce((a, b) => +a + +b)
        : 1;
      return v;
    },
    creation_disabled() {
      let arr = [];

Simple, [10.12.2021 15:32]
arr.push(this.image_loading);
      arr.push(!this.feed.name);
      arr.push(!this.feed.description.text);
      arr.push(!this.feed.exchanges.length);
      arr.push(this.fee_error);
      arr.push(this.price_error);
      arr.push(!this.feed.description.telegram_account);

      arr.push(this.tv_link_isnt_correct);

      arr.push(this.feeMoreThanStartValue());
      arr.push(this.priceMoreThanStartValue());
      arr.push(this.BITMEX_AND_OTHERS_ERROR);
      arr.push(this.BINANCE_MARGIN_AND_OTHERS_ERROR);

      // наличие значений
      if (this.feed.usage_type && this.feed.usage_type.label != "TELEGRAM") {
        arr.push(this.all_selected_base_currencies_correct === false);
      } else {
        arr.push(
          +this.feed.averaging_amount_factor < 0 ||
            this.feed.averaging_amount_factor > 5
        );
        arr.push(
          +this.feed.averaging_threshold_factor < 0 ||
            this.feed.averaging_threshold_factor > 5
        );
        arr.push(+toFixed(this.summary_tps_amount, 2) != 100);
        arr.push(this.feed.limit_per_task > 100);
        arr.push(
          this.feed.tp_trailing_value > 100 || this.feed.tp_trailing_value < 0.5
        );
        if (this.feed.use_stop_loss) {
          arr.push(
            this.feed.stop_loss.threshold_value < 0 ||
              this.feed.stop_loss.threshold_value > 100
          );
        }
        if (this.feed.use_averaging) {
          arr.push(
            this.feed.averaging_amount < 0 || this.feed.averaging_amount > 100
          );
        }
      }
      // console.log('arr', arr)
      return arr.reduce((a, b) => a || b);
    },
    exchanges() {
      return this.$store.state.exchanges.exchanges.filter(
        (el) => el.name !== "Demo Binance"
      );
    },
  },
  mounted() {
    connectors.utils.getSettings().then((settings) => {
      this.$set(this, "settings", settings);
    });

    this.feed_id = this.$route.params.feed_id;

    if (this.feed_id) {
      this.getPersonalFeeds();
    } else {
      this.feed.usage_type = this.feed_types[0];
      this.feed.description.trade_style = this.trade_styles[0];

      for (let sett in this.feed_default_settings) {
        this.$set(this.feed, sett, this.feed_default_settings[sett]);
      }

Simple, [10.12.2021 15:32]
this.take_profit_selector = "hidden";
      this.stop_loss_selector = "hidden";
    }
  },
  created() {
    connectors.auth.api.getUser().then((res) => {
      this.user = res;
    });
  },
  methods: {
    showBlock(v, inx) {
      if (inx + 1 <= this.setting_list.length - 1) {
        this.setting_list[inx + 1].show = v;
        } 
        if(v){
          this.count_page++
        }
        if(!v){
           this.count_page--
        }
      },
    removeMaxNotional(exValue) {
      let objСomparison = JSON.parse(JSON.stringify(
        exValue
      ));
      delete objСomparison.max_trade_notional
      objСomparison = JSON.stringify(objСomparison)
      return objСomparison
    },
    changeBinanceAccountTypeIsFutures(v) {
      this.binanceAccountTypeIsFutures = v;
    },
    getStopLossTooltipText() {
      if (this.take_profit_selector === "limit") {
        return this.$t("smartTrade.tt_stopOrderNotAvailable");
      } else if (this.take_profit_selector === "stop_order") {
        return this.$t(
          "smartTrade.tt_binance_not_supports_duplicate_stop_orders"
        );
      } else {
        return this.$t("smartTrade.tt_stop_loss_order");
      }
    },
    fillOrdersFields(option) {
      if (option === "tp") {
        if (this.take_profit_selector === "limit") {
          this.limit_orders = true;
          this.take_profit_smart_orders = true;
        } else if (this.take_profit_selector === "stop_order") {
          this.limit_orders = false;
          this.take_profit_smart_orders = true;
        } else if (this.take_profit_selector === "hidden") {
          this.limit_orders = false;
          this.take_profit_smart_orders = false;
        }
      } else if (option === "sl") {
        if (this.stop_loss_selector === "stop_order") {
          this.stop_loss_smart_orders = true;
        } else if (this.stop_loss_selector === "hidden") {
          this.stop_loss_smart_orders = false;
        }
      }
    },
    getExchangeById(id) {
      let el = connectors.exchanges.utils.getExchangeById(id);
      return el || {};
    },
    coinImageSrc(currency) {
      let exchange_id = Object.keys(this.feed.exchanges)[0];
      let ex = this.getExchangeById(exchange_id);
      return connectors.utils.coinImageSrc(currency, ex);
    },
    changeImage2(event) {
      this.image_loading = true;
      // let images = $(this).get(0).files;
      let images = event.target.files;
      connectors.utils.saveImage(images).then((data) => {
        this.$set(this.feed.description, "image_url", data.link);
        this.image_loading = false;
      });
    },
    changeImage(element) {
      const file = element.target.files[0];
      let reader = new FileReader();
      const ths = this;
      reader.onloadend = function () {
        ths.$set(ths.feed.description, "image_url", reader.result);
        ths.image_loading = false;
      };
      reader.readAsDataURL(file);
    },
    openFeedRemoveModal() {
      this.$modal.show("FeedRemoveModal", {
        feed: this.feed,
      });
    },
    feeMoreThanStartValue() {
      if (this.feed.status == "INACTIVE" || !this.feed.status) return false;
      return +this.feed.fee > +this.minimal_fee_for_update;
    },
    priceMoreThanStartValue() {
      if (this.feed.status == "INACTIVE" || !this.feed.status) return false;
      return (
        +this.feed.subscription_period_price > +this.minimal_price_for_update
      );
    },
    getPersonalFeeds() {
      connectors.telegram.api.getPersonalFeeds().then((data) => {
        let feed = data.feeds.find((el) => el.id == this.feed_id);
        connectors.telegram.api
          .getPersonalFeedDescriptions([feed.id])
          .then((descriptions) => {
            feed.description = descriptions[feed.id];
            feed.exchanges = Object.keys(feed.exchanges)
              .map((id) => {
                return this.exchanges.find((ex) => ex.id == id);
              })
              .filter((el) => el);

Simple, [10.12.2021 15:32]
feed.description.average_per_task_amount *= 100;
            feed.description.average_take_profits_amount *= 100;
            feed.description.average_stop_loss_level *= 100;
            if (feed.description) {
              feed.description.trade_style = this.trade_styles.find(
                (el) => el.label == feed.description.trade_style
              );
            }
            feed.fee *= 100;

            this.minimal_fee_for_update = feed.fee;
            this.minimal_price_for_update = +feed.subscription_period_price;

            feed.usage_type = this.feed_types.find(
              (el) => el.label == feed.usage_type
            );

            if (
              feed.type == "TELEGRAM_PERSONAL" ||
              (feed.usage_type.label == "MANUAL" && feed.web_hook_enabled) ||
              (feed.usage_type.label == "MANUAL" && feed.take_profits)
            ) {
              if (feed.type == "TELEGRAM_PERSONAL") {
                feed.usage_type = this.feed_types.find(
                  (el) => el.label == "TELEGRAM"
                );
              }

              feed.limit_per_task *= 100;

              feed.take_profits_count = feed.take_profits.length;
              feed.take_profits = feed.take_profits.map((el) => {
                el.amount *= 100;
                el.threshold_value *= 100;
                return el;
              });
              if (feed.take_profits[feed.take_profits.length - 1].trailing) {
                feed.use_tp_trailing = true;
                feed.tp_trailing_value =
                  feed.take_profits[feed.take_profits.length - 1]
                    .trailing_value * 100;
              }
              if (feed.take_profits[feed.take_profits.length - 1].limit_order) {
                feed.use_tp_limit_orders = true;
              }
              if (feed.stop_loss) {
                feed.use_stop_loss = true;
                if (feed.stop_loss.limit_order) {
                  feed.use_stop_loss_limit_orders = true;
                }
                feed.stop_loss.threshold_value = Math.abs(
                  feed.stop_loss.threshold_value * 100
                );
                feed.stop_loss.trailing_value *= 100;
                if (feed.stop_loss.trailing) {
                  feed.stop_loss.threshold_value =
                    feed.stop_loss.trailing_value;
                }
              } else {
                feed.use_stop_loss = false;
                feed.stop_loss = this.feed_default_settings.stop_loss;
              }

              if (feed.take_profits_count < 5) {
                for (let i = 0; i < 5 - feed.take_profits_count; i++) {
                  feed.take_profits.push({});
                }
              }

              feed.averaging_amount *= 100;
              feed.averaging_threshold *= -100;

              if (feed.leverage != 1) {
                feed.use_leverage = true;
              }

              if (
                feed.quote_currency_whitelist &&
                feed.quote_currency_whitelist.length
              ) {
                feed.use_quote_currency_whitelist = true;
              }

              if (feed.min_price) {
                feed.use_filter_by_price = true;
              }

              if (feed.max_averaging || feed.averaging_amount > 0) {
                feed.use_averaging = true;
              }

              if (feed.max_tasks) {
                feed.use_max_tasks = true;
              }

              if (feed.min_volume) {
                feed.use_filter_by_volume = true;
              }

              if (feed.task_days_to_live) {
                feed.use_tasks_ttl = true;
              }
            }

            if (feed.usage_type && feed.usage_type.label !== "TELEGRAM") {
              if (feed.base_currencies) {
                let isSet = false;
                let lastEx = null;

Simple, [10.12.2021 15:32]
let key = Object.keys(feed.base_currencies);
                let objСomparison = this.removeMaxNotional(feed.base_currencies[key[0]].exchanges[Object.keys(feed.base_currencies[key[0]].exchanges)[0]])
                for (let bc in feed.base_currencies) {
                  let strJson = this.removeMaxNotional(feed.base_currencies[bc].exchanges[Object.keys(feed.base_currencies[bc].exchanges)[0]])
                  let ex = feed.base_currencies[bc].exchanges[Object.keys(feed.base_currencies[bc].exchanges)[0]]
                  lastEx = ex
                  // debugger;
                  if (objСomparison !== strJson) {
                    isSet = true;
                  }
                  if (ex.max_trade_notional) {
                    feed.base_currencies[bc].maxValue = ex.max_trade_notional;
                  }
                }
                if (isSet === false) {
                  let isRec = false;
                  if (lastEx.use_earned_recommended) {
                    feed.use_earned_recommended = lastEx.use_earned_recommended;
                    isRec = true;
                  }
                  if (lastEx.max_drawdown_recommended) {
                    feed.max_drawdown = true;
                    feed.maximum_drawdown_amount =
                      +lastEx.max_drawdown_recommended * 100;
                    isRec = true;
                  }
                  if (lastEx.drawdown_active_tasks_recommended) {
                    feed.drawdown_active_tasks_recommended =
                      lastEx.drawdown_active_tasks_recommended;
                    isRec = true;
                  }
                  feed.set_recommended_for_each_currency = false;
                  feed.recommended_settings = isRec;
                } else {
                  feed.recommended_settings = true;
                  feed.set_recommended_for_each_currency = true;
                  for (let bc in feed.base_currencies) {
                    feed.base_currencies[bc].setRecommended = true;
                  }
                }
              }
            }
            this.feed = feed;
            this.feed.hide_proposals = !feed.show_all_active_proposals;
            this.is_binance_margin = feed.binance_margin;

            if (feed.take_profit_smart_orders & feed.limit_orders) {
              this.take_profit_selector = "limit";
            } else if (feed.take_profit_smart_orders & !feed.limit_orders) {
              this.take_profit_selector = "stop_order";
            } else if (!feed.take_profit_smart_orders & !feed.limit_orders) {
              this.take_profit_selector = "hidden";
            }

Simple, [10.12.2021 15:32]
if (feed.stop_loss_smart_orders) {
              this.stop_loss_selector = "stop_order";
            } else {
              this.stop_loss_selector = "hidden";
            }
          });
      });
    },
    toggleWebhookModeWithMessage(new_feed) {
      connectors.telegram.api
        .toggleWebhookMode({
          feed_id: +new_feed.id,
          web_hook_enabled: this.feed.web_hook_enabled,
        })
        .then(
          (res) => {
            if (res.data.success) {
              messagesController.addMessage({
                type: "success",
                msg_slug: "FEED_WAS_UPDATED",
              });
              this.$router.push({
                name: "Cabinet",
              });
            } else {
              messagesController.addMessage({
                type: "error",
                msg_slug: "FEED_ERROR_CREATION",
              });
            }
          },
          (err) => {
            messagesController.addMessage({
              type: "error",
              msg_slug: "FEED_ERROR_CREATION",
            });
          }
        );
    },
    createFeed() {
      let base_currencies;
      let exchanges = {};
      let default_settings_active = null;
      // для старых
      if (this.feed.usage_type && this.feed.usage_type.label != "TELEGRAM") {
        exchanges = this.feed.exchanges.map((el) => el.id);
        // for (let id of this.feed.exchanges.map(el => el.id)) {
        //   exchanges[id] = {};
        //   if (this.feed.recommended_settings) {
        //     if (this.feed.use_earned_recommended) {
        //       exchanges[id].use_earned_recommended = true
        //     }
        //     if (this.feed.max_drawdown) {
        //       exchanges[id].max_drawdown_recommended = +this.feed.maximum_drawdown_amount
        //     }
        //     if (this.feed.max_drawdown && this.feed.drawdown_active_tasks_recommended) {
        //       exchanges[id].drawdown_active_tasks_recommended = this.feed.drawdown_active_tasks_recommended
        //     }
        //   }
        // }
        base_currencies =
          this.$refs.SelectBaseCurrenciesSection.getSelectedCurrenciesObject(false);
      } else {
        // для новых
        base_currencies = undefined;
        exchanges = {};
        for (let id of this.feed.exchanges.map((el) => el.id)) {
          // exchanges[id] = ['BTC', 'USDT'];
          exchanges[id] = null;
        }
        // default_settings_active = false;
      }

      let data = {
        name: this.feed.name,
        description: {
          text: this.feed.description.text,
          full_description: this.feed.description.full_description,
          image_url: this.feed.description.image_url,
          average_per_task_amount:
            this.feed.description.average_per_task_amount / 100,
          average_take_profits_amount:
            this.feed.description.average_take_profits_amount / 100,
          average_stop_loss_level:
            this.feed.description.average_stop_loss_level / 100,
          trade_style:
            this.feed.description.trade_style &&
            this.feed.description.trade_style.label,
          trading_view_link: this.feed.description.trading_view_link,
          telegram_account: this.feed.description.telegram_account,
          // game_of_traders : this.feed.description.game_of_traders
        },
        usage_type: this.feed.usage_type.label,
        fee: this.feed.fee / 100,
        subscription_period_price: +this.feed.subscription_period_price,
        exchanges,
        base_currencies,
        use_forwarded_messages: this.feed.use_forwarded_messages,

        default_settings_active: this.feed.default_settings_active,
        minimal_limit: this.feed.minimal_limit,
        limit_per_task: this.feed.limit_per_task / 100,
        buy_limit_order: this.feed.buy_limit_order,
        single_task_per_symbol: this.feed.single_task_per_symbol,
        web_hook_single_signal_per_symbol:
          this.feed.web_hook_single_signal_per_symbol,
        auto_averaging: this.feed.use_averaging,
        averaging_threshold: this.feed.averaging_threshold,
        averaging_amount: this.feed.use_averaging
          ? +this.feed.averaging_amount
          : 0,
        // averaging_amount_incremental : this.feed.averaging_amount_incremental,
        averaging_amount_factor: +this.feed.averaging_amount_factor,
        averaging_threshold_factor: +this.feed.averaging_threshold_factor,
        averaging_take_profit_correction: this.feed.averaging_take_profit_correction,
        averaging_buy_limit_order: this.feed.averaging_buy_limit_order,
        wait_buy_for_sell: this.feed.wait_buy_for_sell,

        stop_loss: this.feed.stop_loss,
      };

      data = Object.assign(
        data,
        this.$refs.SelectBaseCurrenciesSection.getBinanceAccountType()
      );

      if (data.usage_type !== "TELEGRAM") {
        data.moderate_subscriptions = this.feed.moderate_subscriptions;
        data.show_all_active_proposals = !this.feed.hide_proposals;
      }

      if (
        data.usage_type == "TELEGRAM" ||
        (data.usage_type == "MANUAL" && this.feed.web_hook_enabled)
      ) {
        data.take_profits = this.feed.take_profits
          .slice(0, this.feed.take_profits_count)
          .map((el) => {
            // el.amount /= 100;
            // el.threshold_value /= 100;
            return {
              amount: el.amount / 100,
              threshold_value: el.threshold_value / 100,
            };
          });

        if (this.feed.use_leverage) {
          data.leverage = +this.feed.leverage === 0 ? 1 : +this.feed.leverage;
        } else if (!this.feed.use_leverage && data.futures) {
          data.leverage = 1;
        }

        if (this.feed.use_averaging) {
          data.max_averaging = +this.feed.max_averaging;
        } else {
          data.max_averaging = 0;
        }

        if (this.feed.use_quote_currency_whitelist) {
          if (this.feed.quote_currency_whitelist.length) {
            data.quote_currency_whitelist = this.feed.quote_currency_whitelist;
          }
        } else {
          data.quote_currency_whitelist = null;
        }

        if (this.feed.use_max_tasks) {
          data.max_tasks = +this.feed.max_tasks;
        }

        if (this.feed.use_filter_by_price) {
          data.min_price = this.feed.min_price;
        } else {
          data.min_price = null;
        }

        if (this.feed.use_filter_by_volume) {
          data.min_volume = this.feed.min_volume;
        } else {
          data.min_volume = null;
        }

        data.averaging_amount /= 100;
        // должно быть отрицательным
        data.averaging_threshold /= -100;

        if (this.feed.use_tasks_ttl) {
          data.task_days_to_live = +this.feed.task_days_to_live;
        } else {
          data.task_days_to_live = null;
        }
        if (this.feed.use_stop_loss) {
          data.stop_loss.threshold_value /= -100;
          if (data.stop_loss.trailing) {
            data.stop_loss.trailing_value = Math.abs(data.stop_loss.threshold_value);
            delete data.stop_loss.threshold_value;
          }
          if (this.feed.use_stop_loss_limit_orders) {
            data.stop_loss.limit_order = true;
          } else {
            data.stop_loss.limit_order = false;
          }
        } else {
          data.stop_loss = null;
        }

data.take_profits = data.take_profits.map((el) => {
          el.trailing = false;
          delete el.trailing_value;
          return el;
        });
        if (this.feed.use_tp_trailing) {
          data.take_profits[data.take_profits.length - 1].trailing = true;
          data.take_profits[data.take_profits.length - 1].trailing_value =
            this.feed.tp_trailing_value / 100;
        } else {
          // delete data.take_profits[data.take_profits.length - 1].trailing;
          delete data.take_profits[data.take_profits.length - 1].trailing_value;
        }
        if (this.feed.use_tp_limit_orders) {
          for (let tp of data.take_profits) {
            tp.limit_order = true;
          }
        } else {
          for (let tp of data.take_profits) {
            tp.limit_order = false;
          }
        }

        data.take_profit_smart_orders = this.take_profit_smart_orders;
        data.limit_orders = this.limit_orders;
        data.stop_loss_smart_orders = this.stop_loss_smart_orders;
      }

      let createHandlerName = "createFeed";
      let updateHandlerName = "updateFeed";

      if (this.feed.usage_type && this.feed.usage_type.label == "TELEGRAM") {
        createHandlerName = "createTelegramFeed";
        updateHandlerName = "updateTelegramFeed";
      }
      //return
      if (!this.feed.id) {
        connectors.telegram.api[createHandlerName](data).then(
          (new_feed) => {
            data.feed_id = new_feed.id;
            data.leverage = this.feed.leverage;
            data.proportional_take_profits =
              this.feed.proportional_take_profits;

            if (new_feed.usage_type == "MANUAL" && this.feed.web_hook_enabled) {
              connectors.telegram.api.sendWebhookSettings(data).then((res) => {
                connectors.telegram.api
                  .toggleWebhookMode({
                    feed_id: +new_feed.id,
                    web_hook_enabled: this.feed.web_hook_enabled,
                  })
                  .then((res) => {});
              });
            } else if (
              new_feed.usage_type == "TELEGRAM" &&
              this.feed.web_hook_enabled
            ) {
              connectors.telegram.api
                .toggleWebhookMode({
                  feed_id: +new_feed.id,
                  web_hook_enabled: this.feed.web_hook_enabled,
                })
                .then((res) => {});
            }
            messagesController.addMessage({
              type: "success",
              msg_slug: "FEED_WAS_CREATED",
            });
            this.$router.push({
              name: "Cabinet",
            });
          },
          (err) => {
            messagesController.addMessage({
              type: "error",
              msg_slug: "FEED_ERROR_CREATION",
            });
          }
        );
      } else {
        data.feed_id = this.feed.id;

        data.leverage = this.feed.leverage;
        data.proportional_take_profits = this.feed.proportional_take_profits;

Simple, [10.12.2021 15:32]
connectors.telegram.api[updateHandlerName](data)
          .then((new_feed) => {
            if (!new_feed) return;
            if (this.feed.web_hook_enabled) {
              if (this.feed.usage_type.label == "MANUAL") {
                connectors.telegram.api
                  .sendWebhookSettings(data)
                  .then((res) => {
                    if (res.data.success) {
                      this.toggleWebhookModeWithMessage(new_feed);
                    }
                  });
              } else {
                this.toggleWebhookModeWithMessage(new_feed);
              }
            } else {
              this.toggleWebhookModeWithMessage(new_feed);
              this.$router.push({
                name: "Cabinet",
              });
            }
          })
          .catch((err) => {
            messagesController.addMessage({
              type: "error",
              msg_slug: "FEED_ERROR_CREATION",
            });
          });
      }
    },
  },
};
window.positive = function (c) {
  let is_dot = c == 44;
  let is_comma = c == 46;
  let is_number = c >= 48 && c <= 57;

  return is_number || is_dot || is_comma;
};
window.positiveAndRound = function (c) {
  return c >= 48 && c <= 57;
};
</script>


<style lang="scss" scoped>
@import "./PersonalFeedForm.scss";
.set_parameters .use-mini-multiselect .multiselect .multiselect__tags {
  height: inherit;
}
</style>
