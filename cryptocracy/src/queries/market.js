import { gql } from "@apollo/client";

export const GET_MARKET_DATA = gql`
  query GetMarketData($page: Int) {
    coinlist(page: $page) {
      id
      symbol
      name
      image
      currentPrice
      marketCap
      marketCapRank
      fullyDilutedValuation
      totalVolume
      high24h
      low24h
      priceChange24h
      priceChangePercentage24h
      marketCapChange24h
      marketCapChangePercentage24h
      circulatingSupply
      totalSupply
      maxSupply
      ath
      athChangePercentage
      athDate
      atl
      atlChangePercentage
      atlDate
      lastUpdated
      priceChangePercentage14dInCurrency
      priceChangePercentage1hInCurrency
      priceChangePercentage1yInCurrency
      priceChangePercentage200dInCurrency
      priceChangePercentage24hInCurrency
      priceChangePercentage30dInCurrency
      priceChangePercentage7dInCurrency
      roi {
        currency
        times
        percentage
      }
    }
  }
`;

export const GET_COIN_DETAIL = gql`
  query GetCoinDetail($id: String!) {
    coinDetail(id: $id) {
      id
      symbol
      name
      assetPlatformId
      blockTimeInMinutes
      hashingAlgorithm
      categories
      description {
        en
      }
      links {
        homepage
        blockchainSite
        officialForumUrl
        chatUrl
        announcementUrl
        twitterScreenName
        facebookUsername
        bitcointalkThreadIdentifier
        telegramChannelIdentifier
        subredditUrl
        reposUrl {
          github
        }
      }
      image {
        thumb
        small
        large
      }
      countryOrigin
      genesisDate
      sentimentVotesUpPercentage
      sentimentVotesDownPercentage
      marketCapRank
      coingeckoRank
      coingeckoScore
      developerScore
      communityScore
      liquidityScore
      publicInterestScore
      marketData {
        currentPrice {
          usd
          btc
        }
        roi {
          usd
          btc
        }
        ath {
          usd
          btc
        }
        athChangePercentage {
          usd
          btc
        }
        athDate {
          usd
        }
        atl {
          usd
          btc
        }
        atlChangePercentage {
          usd
          btc
        }
        atlDate {
          usd
        }
        marketCap {
          usd
          btc
        }
        marketCapRank {
          usd
          btc
        }
        fullyDilutedValuation {
          usd
          btc
        }
        totalVolume {
          usd
          btc
        }
        high24h {
          usd
          btc
        }
        low24h {
          usd
          btc
        }
        priceChange24h
        priceChangePercentage24h
        priceChangePercentage7d
        priceChangePercentage14d
        priceChangePercentage30d
        priceChangePercentage60d
        priceChangePercentage200d
        priceChangePercentage1y
        marketCapChange24h
        marketCapChangePercentage24h
        priceChange24hInCurrency {
          usd
          btc
        }
        priceChangePercentage1hInCurrency {
          usd
          btc
        }
        priceChangePercentage24hInCurrency {
          usd
          btc
        }
        priceChangePercentage7dInCurrency {
          usd
          btc
        }
        priceChangePercentage14dInCurrency {
          usd
          btc
        }
        priceChangePercentage30dInCurrency {
          usd
          btc
        }
        priceChangePercentage60dInCurrency {
          usd
          btc
        }
        priceChangePercentage200dInCurrency {
          usd
          btc
        }
        priceChangePercentage1yInCurrency {
          usd
          btc
        }
        marketCapChange24hInCurrency {
          usd
          btc
        }
        marketCapChangePercentage24hInCurrency {
          usd
          btc
        }
        totalSupply
        maxSupply
        circulatingSupply
        lastUpdated
      }
      communityData {
        facebookLikes
        twitterFollowers
        redditAveragePosts48h
        redditAverageComments48h
        redditSubscribers
        redditAccountsActive48h
        telegramChannelUserCount
      }
      developerData {
        forks
        stars
        subscribers
        totalIssues
        closedIssues
        pullRequestsMerged
        pullRequestContributors
        codeAdditionsDeletions4Weeks {
          additions
          deletions
        }
        commitCount4Weeks
      }
      publicInterestStats {
        alexaRank
        bingMatches
      }
      statusUpdates
      lastUpdated
      tickers {
        base
        target
        market {
          name
          identifier
          hasTradingIncentive
        }
        last
        volume
        convertedLast {
          btc
          eth
          usd
        }
        convertedVolume {
          btc
          eth
          usd
        }
        trustScore
        bidAskSpreadPercentage
        timestamp
        lastTradedAt
        lastFetchAt
        isAnomaly
        isStale
        tradeUrl
        coinId
      }
    }
  }
`;

export const GET_COINS_BY_ID = gql`
  query GetCoinsById($ids: String) {
    coinListByIds(ids: $ids) {
      id
      symbol
      name
      image
      currentPrice
      marketCap
      marketCapRank
      fullyDilutedValuation
      totalVolume
      high24h
      low24h
      priceChange24h
      priceChangePercentage24h
      marketCapChange24h
      marketCapChangePercentage24h
      circulatingSupply
      totalSupply
      maxSupply
      ath
      athChangePercentage
      athDate
      atl
      atlChangePercentage
      atlDate
      lastUpdated
      priceChangePercentage14dInCurrency
      priceChangePercentage1hInCurrency
      priceChangePercentage1yInCurrency
      priceChangePercentage200dInCurrency
      priceChangePercentage24hInCurrency
      priceChangePercentage30dInCurrency
      priceChangePercentage7dInCurrency
      roi {
        currency
        times
        percentage
      }
    }
  }
`;
