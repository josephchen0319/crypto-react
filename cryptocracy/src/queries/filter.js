import { gql } from "@apollo/client";

export const GET_FILTERS = gql`
  query {
    filters {
      edges {
        node {
          id
          category
          filterName
          filterContent
          filterToApiField
          createdTime
          updatedTime
        }
      }
    }
  }
`;

export const GET_FILTERED_COIN_LIST = gql`
  query GetFilteredCoinList($filterDetails: [SearchFilteredResultsInputType]) {
    filteredCoinlist(filterDetails: $filterDetails) {
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
